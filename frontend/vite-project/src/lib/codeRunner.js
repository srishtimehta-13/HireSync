import axiosInstance from "./axios";

/**
 * @param {string} language - programming language
 * @param {string} code - source code to execute
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const { data } = await axiosInstance.post(
      "/code/execute",
      { language, code },
      { timeout: 30000 }
    );
    return {
      ...data,
      output: data.output || (data.success ? "No output" : ""),
    };
  } catch (error) {
    return {
      success: false,
      output: error.response?.data?.output || "",
      error:
        error.response?.data?.message ||
        (error.code === "ECONNABORTED"
          ? "The code runner did not respond in time. Please try again."
          : `Failed to execute code: ${error.message}`),
    };
  }
}