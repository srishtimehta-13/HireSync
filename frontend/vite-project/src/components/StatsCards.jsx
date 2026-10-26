import { ActivityIcon, HistoryIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 flex flex-col gap-5">
      {/* Active Count Card */}
      <div className="rounded-2xl bg-[#1C2625] border border-[#2B3835] p-5 hover:border-[#10B981]/50 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="size-10 rounded-xl bg-[#151E1C] border border-[#2B3835] flex items-center justify-center">
            <ActivityIcon className="size-5 text-[#10B981]" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
            <span className="size-1.5 rounded-full bg-[#10B981] animate-pulse" />
            Live Now
          </span>
        </div>
        <div className="font-heading text-3xl font-bold text-[#F4F7F5] tracking-tight">
          {activeSessionsCount}
        </div>
        <div className="text-xs text-[#94A3A0] mt-1 font-mono">Active Rooms Waiting</div>
      </div>

      {/* Recent Count Card */}
      <div className="rounded-2xl bg-[#1C2625] border border-[#2B3835] p-5 hover:border-[#06C5D8]/50 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="size-10 rounded-xl bg-[#151E1C] border border-[#2B3835] flex items-center justify-center">
            <HistoryIcon className="size-5 text-[#06C5D8]" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[#151E1C] text-[#94A3A0] border border-[#2B3835]">
            Archive
          </span>
        </div>
        <div className="font-heading text-3xl font-bold text-[#F4F7F5] tracking-tight">
          {recentSessionsCount}
        </div>
        <div className="text-xs text-[#94A3A0] mt-1 font-mono">Completed Sessions</div>
      </div>
    </div>
  );
}

export default StatsCards;