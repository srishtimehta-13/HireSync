// Piston API is a service for code execution

const PISTON_API =
  import.meta.env?.VITE_PISTON_API_URL || "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    if (typeof code !== "string" || !code.trim()) {
      return {
        success: false,
        error: "Enter some code before running it.",
      };
    }

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: `main.${getFileExtension(language)}`,
            content: code,
          },
        ],
      }),
    });

    const responseBody = await response.text();
    let data;

    try {
      data = responseBody ? JSON.parse(responseBody) : {};
    } catch {
      data = { message: responseBody };
    }

    if (!response.ok) {
      const detail =
        data.message || data.error || data.detail || response.statusText || "Unknown error";
      const isWhitelistError =
        response.status === 401 && /whitelist only/i.test(detail);

      return {
        success: false,
        error: isWhitelistError
          ? `The public Piston API is restricted to whitelisted users. Request access at https://github.com/engineer-man/piston#public-api or set VITE_PISTON_API_URL to an authorized Piston service. ${detail}`
          : `Code runner returned HTTP ${response.status}: ${detail}`,
      };
    }

    if (data.compile?.code !== undefined && data.compile.code !== 0) {
      return {
        success: false,
        output: data.compile.output || "",
        error: data.compile.stderr || "Compilation failed.",
      };
    }

    if (!data.run) {
      return {
        success: false,
        error: data.message || "Code runner returned an unexpected response.",
      };
    }

    const output = data.run.output || "";
    const stderr = data.run.stderr || "";

    if (stderr || data.run.code !== 0) {
      return {
        success: false,
        output: output,
        error: stderr || `Program exited with code ${data.run.code}.`,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    if (error.name === "AbortError") {
      return {
        success: false,
        error: "Code execution timed out after 20 seconds. Try again with a shorter-running program.",
      };
    }

    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}