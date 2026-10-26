import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  UsersIcon,
  ZapIcon,
  Loader2Icon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="lg:col-span-2 rounded-2xl bg-[#1C2625] border border-[#2B3835] flex flex-col overflow-hidden">
      {/* HEADER SECTION */}
      <div className="p-5 border-b border-[#2B3835] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-[#151E1C] border border-[#2B3835] flex items-center justify-center">
            <ZapIcon className="size-4 text-[#10B981]" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-[#F4F7F5] tracking-tight">
              Live Sessions
            </h2>
            <p className="text-xs text-[#94A3A0]">Active interview rooms in progress</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#151E1C] border border-[#2B3835]">
          <span className="size-2 bg-[#10B981] rounded-full" />
          <span className="text-xs font-mono font-medium text-[#10B981]">
            {sessions.length} Active
          </span>
        </div>
      </div>

      {/* SESSIONS LIST */}
      <div className="p-5 flex-1 overflow-y-auto max-h-[420px] space-y-3">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#94A3A0]">
            <Loader2Icon className="size-8 animate-spin text-[#10B981] mb-2" />
            <span className="text-xs font-mono">Loading sessions...</span>
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session._id}
              className="rounded-xl bg-[#151E1C] border border-[#2B3835] p-4 hover:border-[#10B981]/50 transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* LEFT INFO */}
              <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                <div className="size-11 rounded-xl bg-[#1C2625] border border-[#2B3835] flex items-center justify-center shrink-0">
                  <Code2Icon className="size-5 text-[#06C5D8]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-heading font-semibold text-base text-[#F4F7F5] truncate">
                      {session.problem}
                    </h3>
                    <span
                      className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded border ${getDifficultyBadgeClass(
                        session.difficulty
                      )}`}
                    >
                      {session?.difficulty
                        ? session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)
                        : "Easy"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#94A3A0] font-mono">
                    <div className="flex items-center gap-1.5">
                      <CrownIcon className="size-3.5 text-[#10B981]" />
                      <span className="truncate max-w-[120px]">{session.host?.name || "Host"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <UsersIcon className="size-3.5" />
                      <span>{session.participant ? "2/2" : "1/2"}</span>
                    </div>
                    {session.participant && !isUserInSession(session) ? (
                      <span className="text-[#EF4444] font-bold">FULL</span>
                    ) : (
                      <span className="text-[#10B981] font-bold">OPEN</span>
                    )}
                  </div>
                </div>
              </div>

              {/* ACTION */}
              <div className="shrink-0 flex items-center justify-end">
                {session.participant && !isUserInSession(session) ? (
                  <button
                    disabled
                    className="px-3.5 py-1.5 rounded-lg border border-[#2B3835] text-xs font-mono text-[#94A3A0] opacity-50 cursor-not-allowed"
                  >
                    Room Full
                  </button>
                ) : (
                  <Link
                    to={`/session/${session._id}`}
                    className="px-4 py-2 bg-[#10B981] hover:brightness-110 active:scale-[0.98] rounded-xl text-[#111918] font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{isUserInSession(session) ? "Rejoin" : "Join"}</span>
                    <ArrowRightIcon className="size-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-[#94A3A0]">
            <div className="size-12 mx-auto mb-3 rounded-2xl bg-[#151E1C] border border-[#2B3835] flex items-center justify-center">
              <ZapIcon className="size-5 text-[#94A3A0]/60" />
            </div>
            <p className="text-sm font-semibold text-[#F4F7F5] mb-1">No active sessions</p>
            <p className="text-xs font-mono">Click "Create Session" above to launch an interview room.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActiveSessions;