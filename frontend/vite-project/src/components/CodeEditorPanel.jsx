import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    <div className="h-full bg-[#111918] flex flex-col overflow-hidden">
      {/* TOOLBAR */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1C2625] border-b border-[#2B3835]">
        <div className="flex items-center gap-3">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="size-5"
          />
          <select
            className="px-2.5 py-1.5 rounded-lg bg-[#151E1C] border border-[#2B3835] text-[#F4F7F5] text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#06C5D8] focus:border-[#06C5D8] transition-all cursor-pointer"
            value={selectedLanguage}
            onChange={onLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key} className="bg-[#151E1C] text-[#F4F7F5]">
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="px-3.5 py-1.5 bg-[#10B981] hover:brightness-110 active:scale-[0.98] rounded-lg text-[#111918] font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isRunning}
          onClick={onRunCode}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-3.5 animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <PlayIcon className="size-3.5 fill-current" />
              <span>Run Code</span>
            </>
          )}
        </button>
      </div>

      {/* MONACO EDITOR */}
      <div className="flex-1 bg-[#111918] relative">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            lineHeight: 22,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            padding: { top: 12, bottom: 12 },
            renderLineHighlight: "line",
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;