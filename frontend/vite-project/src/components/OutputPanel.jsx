import { TerminalIcon } from "lucide-react";

function OutputPanel({ output }) {
  return (
    <div className="h-full bg-[#111918] flex flex-col overflow-hidden text-[#F4F7F5]">
      {/* HEADER */}
      <div className="px-4 py-2 bg-[#1C2625] border-b border-[#2B3835] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="size-3.5 text-[#06C5D8]" />
          <span className="font-mono text-xs uppercase font-semibold text-[#94A3A0]">
            Console Output
          </span>
        </div>
        {output && (
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
              output.success
                ? "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30"
                : "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30"
            }`}
          >
            {output.success ? "Passed" : "Error"}
          </span>
        )}
      </div>

      {/* OUTPUT CONTENT */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed bg-[#111918]">
        {output === null ? (
          <p className="text-[#94A3A0]/60">
            Click "Run Code" above to execute and inspect stdout/stderr here...
          </p>
        ) : output.success ? (
          <pre className="text-[#10B981] whitespace-pre-wrap">{output.output}</pre>
        ) : (
          <div className="space-y-2">
            {output.output && (
              <pre className="text-[#94A3A0] whitespace-pre-wrap">{output.output}</pre>
            )}
            <pre className="text-[#EF4444] whitespace-pre-wrap">{output.error}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;