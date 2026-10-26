function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  return (
    <div className="h-full overflow-y-auto bg-[#111918] text-[#F4F7F5]">
      {/* HEADER SECTION */}
      <div className="p-5 bg-[#1C2625] border-b border-[#2B3835] sticky top-0 z-10">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h1 className="font-heading text-2xl font-bold text-[#F4F7F5] tracking-tight">
            {problem.title}
          </h1>
          <span
            className={`text-xs font-mono uppercase px-2.5 py-0.5 rounded border shrink-0 ${
              problem.difficulty === "Easy"
                ? "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30"
                : problem.difficulty === "Medium"
                ? "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30"
                : "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30"
            }`}
          >
            {problem.difficulty}
          </span>
        </div>
        <p className="text-xs text-[#94A3A0] font-mono">{problem.category}</p>

        {/* Problem selector */}
        <div className="mt-3">
          <select
            className="w-full px-3 py-2 rounded-lg bg-[#151E1C] border border-[#2B3835] text-[#F4F7F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#06C5D8] focus:border-[#06C5D8] transition-all cursor-pointer"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {allProblems.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#151E1C] text-[#F4F7F5]">
                {p.title} ({p.difficulty})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* PROBLEM DESC */}
        <div className="rounded-2xl bg-[#1C2625] border border-[#2B3835] p-5">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#94A3A0] mb-3">
            Problem Statement
          </h2>

          <div className="space-y-3 text-sm leading-relaxed text-[#F4F7F5]">
            <p>{problem.description.text}</p>
            {problem.description.notes?.map((note, idx) => (
              <p key={idx} className="text-[#94A3A0] text-xs">
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* EXAMPLES SECTION */}
        <div className="rounded-2xl bg-[#1C2625] border border-[#2B3835] p-5">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#94A3A0] mb-3">
            Test Examples
          </h2>
          <div className="space-y-4">
            {problem.examples.map((example, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#151E1C] border border-[#2B3835] text-[#94A3A0]">
                    #{idx + 1}
                  </span>
                  <p className="font-semibold text-xs text-[#F4F7F5]">Example {idx + 1}</p>
                </div>
                <div className="rounded-xl bg-[#151E1C] border border-[#2B3835] p-3.5 font-mono text-xs space-y-1">
                  <div className="flex gap-2">
                    <span className="text-[#10B981] font-bold min-w-[65px]">Input:</span>
                    <span className="text-[#F4F7F5]">{example.input}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#06C5D8] font-bold min-w-[65px]">Output:</span>
                    <span className="text-[#F4F7F5]">{example.output}</span>
                  </div>
                  {example.explanation && (
                    <div className="pt-2 border-t border-[#2B3835] mt-2">
                      <span className="text-[#94A3A0] font-sans text-xs">
                        <span className="font-semibold text-[#F4F7F5]">Explanation:</span> {example.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONSTRAINTS */}
        <div className="rounded-2xl bg-[#1C2625] border border-[#2B3835] p-5">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#94A3A0] mb-3">
            Constraints
          </h2>
          <ul className="space-y-2 text-xs font-mono text-[#F4F7F5]">
            {problem.constraints.map((constraint, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#10B981]">•</span>
                <code className="text-[#94A3A0]">{constraint}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProblemDescription;