import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, PlusIcon, TerminalIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative border-b border-[#2B3835] bg-[#111918]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-[#1C2625] border border-[#2B3835] flex items-center justify-center">
                <TerminalIcon className="size-4 text-[#10B981]" />
              </div>
              <span className="text-xs font-mono text-[#94A3A0] uppercase tracking-wider">
                HireSync Workspace
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#F4F7F5] tracking-tight">
              Welcome back, {user?.firstName || "Engineer"}
            </h1>

            <p className="text-[#94A3A0] text-sm sm:text-base font-sans">
              Conduct live technical interviews, practice algorithmic problems, or review past performance.
            </p>
          </div>

          <div>
            <button
              onClick={onCreateSession}
              className="group px-6 py-3.5 bg-[#10B981] hover:brightness-110 active:scale-[0.98] rounded-xl text-[#111918] font-bold text-sm shadow-md transition-all duration-150 flex items-center gap-2.5 shrink-0"
            >
              <PlusIcon className="size-5 stroke-[2.5]" />
              <span>Create Session</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;