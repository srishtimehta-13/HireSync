import { ENV } from "../lib/env.js";

const ONLINECOMPILER_EXECUTE_URL =
  "https://api.onlinecompiler.io/api/v2/piston/execute";
const LANGUAGE_CONFIG = {
  javascript: { version: "18.15.0", extension: "js" },
  python: { version: "3.10.0", extension: "py" },
  java: { version: "15.0.2", extension: "java" },
};
const MAX_CODE_LENGTH = 100_000;
const RUN_TIMEOUT_MS = 20_000;

export async function executeCode(req, res) {
  const { language, code } = req.body || {};
  const languageConfig = Object.hasOwn(LANGUAGE_CONFIG, language)
    ? LANGUAGE_CONFIG[language]
    : null;

  if (!languageConfig) {
    return res.status(400).json({
      message: "Unsupported language. Choose JavaScript, Python, or Java.",
    });
  }

  if (typeof code !== "string" || !code.trim()) {
    return res.status(400).json({ message: "Enter some code before running it." });
  }

  if (Buffer.byteLength(code, "utf8") > MAX_CODE_LENGTH) {
    return res.status(413).json({ message: "Code must be 100 KB or smaller." });
  }

  if (!ENV.ONLINECOMPILER_API_KEY) {
    return res.status(503).json({
      message: "Code execution is not configured. Set ONLINECOMPILER_API_KEY on the backend.",
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), RUN_TIMEOUT_MS);

  try {
    const providerResponse = await fetch(ONLINECOMPILER_EXECUTE_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: ENV.ONLINECOMPILER_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        version: languageConfig.version,
        files: [{ name: `main.${languageConfig.extension}`, content: code }],
        run_timeout: RUN_TIMEOUT_MS,
      }),
    });

    const responseBody = await providerResponse.text();
    let result;
    try {
      result = responseBody ? JSON.parse(responseBody) : {};
    } catch {
      result = { message: responseBody };
    }

    if (!providerResponse.ok) {
      if (providerResponse.status === 401 || providerResponse.status === 403) {
        return res.status(502).json({
          message: "OnlineCompiler rejected the backend API key. Check ONLINECOMPILER_API_KEY.",
        });
      }

      if (providerResponse.status === 429) {
        return res.status(503).json({
          message: "OnlineCompiler rate limit reached. Please try again shortly.",
        });
      }

      console.error(
        `OnlineCompiler returned HTTP ${providerResponse.status}:`,
        result.message || result.error || providerResponse.statusText
      );
      return res.status(502).json({ message: "OnlineCompiler could not run this code." });
    }

    if (!result.run || typeof result.run !== "object") {
      console.error("OnlineCompiler returned an unexpected execution response");
      return res.status(502).json({ message: "OnlineCompiler returned an invalid response." });
    }

    const output = result.run.output || "";
    const error = result.run.stderr || "";
    const succeeded =
      result.run.code === 0 &&
      !["RE", "TO", "SG", "OL", "XX"].includes(result.run.status);

    return res.status(200).json({
      success: succeeded,
      output,
      ...(succeeded
        ? {}
        : {
            error: error || getRunStatusMessage(result.run.status, result.run.code),
          }),
    });
  } catch (error) {
    if (error.name === "AbortError") {
      return res.status(504).json({
        message: "Code execution timed out after 20 seconds. Try a shorter-running program.",
      });
    }

    console.error("OnlineCompiler request failed:", error.message);
    return res.status(502).json({ message: "Unable to reach OnlineCompiler. Please try again." });
  } finally {
    clearTimeout(timeoutId);
  }
}

function getRunStatusMessage(status, exitCode) {
  const statusMessages = {
    RE: `Program exited with code ${exitCode}.`,
    TO: "Program exceeded the execution time limit.",
    SG: "Program was stopped by a signal.",
    OL: "Program produced too much output.",
    XX: "OnlineCompiler encountered an internal execution error.",
  };

  return statusMessages[status] || `Program exited with code ${exitCode}.`;
}
