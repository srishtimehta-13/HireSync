import { Code2, Clock, Users, History, Loader2Icon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="rounded-2xl bg-[#1C2625] border border-[#2B3835] mt-8 overflow-hidden">
      {/* HEADER */}
      <div className="p-5 border-b border-[#2B3835] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-[#151E1C] border border-[#2B3835] flex items-center justify-center">
            <History className="size-4 text-[#06C5D8]" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-[#F4F7F5] tracking-tight">
              Past Interview History
            </h2>
            <p className="text-xs text-[#94A3A0]">Completed sessions and performance archives</p>
          </div>
        </div>

        <span className="text-xs font-mono text-[#94A3A0]">
          {sessions.length} Recorded
        </span>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-[#94A3A0]">
              <Loader2Icon className="size-8 animate-spin text-[#06C5D8] mb-2" />
              <span className="text-xs font-mono">Loading history...</span>
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className="rounded-xl bg-[#151E1C] border border-[#2B3835] p-4 hover:border-[#2B3835]/80 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="size-10 rounded-lg bg-[#1C2625] border border-[#2B3835] flex items-center justify-center shrink-0">
                    <Code2 className="size-5 text-[#94A3A0]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-sm text-[#F4F7F5] truncate mb-1">
                      {session.problem}
                    </h3>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                        session.difficulty === "easy"
                          ? "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30"
                          : session.difficulty === "medium"
                          ? "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30"
                          : "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30"
                      }`}
                    >
                      {session.difficulty}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#94A3A0] font-mono mb-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-[#94A3A0]" />
                    <span>
                      {formatDistanceToNow(new Date(session.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="size-3.5 text-[#94A3A0]" />
                    <span>
                      {session.participant ? "2" : "1"} participant
                      {session.participant ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-[#2B3835] text-[11px] font-mono">
                  <span className="text-[#10B981] font-semibold uppercase">COMPLETED</span>
                  <span className="text-[#94A3A0]">
                    {new Date(session.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-[#94A3A0]">
              <p className="text-sm font-semibold text-[#F4F7F5] mb-1">No completed sessions yet</p>
              <p className="text-xs font-mono">Completed interviews will be archived here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentSessions;