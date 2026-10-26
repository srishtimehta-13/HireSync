import { Link } from "react-router";
import Navbar from "../components/Navbar";
import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon, TerminalSquareIcon } from "lucide-react";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-[#111918] text-[#F4F7F5]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <TerminalSquareIcon className="size-5 text-[#10B981]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#94A3A0]">
              HireSync Curated Problems
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F7F5]">
            Practice Problems
          </h1>
          <p className="text-sm sm:text-base text-[#94A3A0] mt-1">
            Sharpen algorithmic thinking, test edge cases, and prepare for live sessions.
          </p>
        </div>

        {/* PROBLEMS LIST */}
        <div className="space-y-3.5">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="group block rounded-2xl bg-[#1C2625] border border-[#2B3835] p-5 sm:p-6 hover:border-[#10B981]/50 hover:bg-[#1C2625]/90 transition-all duration-150"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* LEFT SIDE */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="size-11 rounded-xl bg-[#151E1C] border border-[#2B3835] flex items-center justify-center shrink-0 group-hover:border-[#06C5D8]/50 transition-colors">
                    <Code2Icon className="size-5 text-[#06C5D8]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <h2 className="font-heading text-lg font-bold text-[#F4F7F5] group-hover:text-[#10B981] transition-colors">
                        {problem.title}
                      </h2>
                      <span
                        className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded border ${
                          problem.difficulty === "Easy"
                            ? "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30"
                            : problem.difficulty === "Medium"
                            ? "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30"
                            : "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                      <span className="text-xs text-[#94A3A0] font-mono">
                        • {problem.category}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#94A3A0] line-clamp-2 leading-relaxed">
                      {problem.description.text}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE ACTION */}
                <div className="shrink-0 flex items-center justify-end sm:justify-start gap-1 text-[#10B981] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  <span>Solve</span>
                  <ChevronRightIcon className="size-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* STATS FOOTER */}
        <div className="mt-10 rounded-2xl bg-[#1C2625] border border-[#2B3835] p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#2B3835]">
            <div className="pt-2 sm:pt-0">
              <div className="text-xs text-[#94A3A0] font-mono uppercase">Total Problems</div>
              <div className="font-heading text-2xl font-bold text-[#F4F7F5] mt-1">
                {problems.length}
              </div>
            </div>

            <div className="pt-2 sm:pt-0">
              <div className="text-xs text-[#94A3A0] font-mono uppercase">Easy</div>
              <div className="font-heading text-2xl font-bold text-[#10B981] mt-1">
                {easyProblemsCount}
              </div>
            </div>

            <div className="pt-2 sm:pt-0">
              <div className="text-xs text-[#94A3A0] font-mono uppercase">Medium</div>
              <div className="font-heading text-2xl font-bold text-[#F59E0B] mt-1">
                {mediumProblemsCount}
              </div>
            </div>

            <div className="pt-2 sm:pt-0">
              <div className="text-xs text-[#94A3A0] font-mono uppercase">Hard</div>
              <div className="font-heading text-2xl font-bold text-[#EF4444] mt-1">
                {hardProblemsCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;