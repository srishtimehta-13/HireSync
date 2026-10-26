import { Code2Icon, Loader2Icon, PlusIcon, XIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-[#111918]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* MODAL BOX */}
      <div className="relative w-full max-w-lg rounded-2xl bg-[#1C2625] border border-[#2B3835] shadow-2xl overflow-hidden z-10">
        {/* HEADER */}
        <div className="p-5 border-b border-[#2B3835] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-[#151E1C] border border-[#2B3835] flex items-center justify-center">
              <PlusIcon className="size-4 text-[#10B981]" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#F4F7F5] tracking-tight">
              Create Interview Session
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#94A3A0] hover:text-[#F4F7F5] transition-colors p-1 rounded-lg hover:bg-[#151E1C]"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-mono font-medium text-[#94A3A0] uppercase tracking-wider">
              Select Problem
            </label>

            <select
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#151E1C] border border-[#2B3835] text-[#F4F7F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#06C5D8] focus:border-[#06C5D8] transition-all font-sans cursor-pointer"
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find((p) => p.title === e.target.value);
                setRoomConfig({
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                });
              }}
            >
              <option value="" disabled className="text-[#94A3A0] bg-[#151E1C]">
                Choose an algorithmic problem...
              </option>

              {problems.map((problem) => (
                <option key={problem.id} value={problem.title} className="bg-[#151E1C] text-[#F4F7F5]">
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* ROOM SUMMARY */}
          {roomConfig.problem && (
            <div className="rounded-xl bg-[#151E1C] border border-[#10B981]/30 p-4 flex items-start gap-3">
              <div className="size-8 rounded-lg bg-[#1C2625] border border-[#2B3835] flex items-center justify-center shrink-0">
                <Code2Icon className="size-4 text-[#10B981]" />
              </div>
              <div className="text-xs space-y-1 font-mono">
                <p className="font-bold text-[#F4F7F5]">Session Specification:</p>
                <p className="text-[#94A3A0]">
                  Problem: <span className="text-[#10B981]">{roomConfig.problem}</span>
                </p>
                <p className="text-[#94A3A0]">
                  Max Capacity: <span className="text-[#F4F7F5]">2 Engineers (1-on-1 Live Room)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="p-5 border-t border-[#2B3835] bg-[#151E1C]/60 flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2.5 rounded-xl border border-[#2B3835] hover:border-[#94A3A0]/50 text-sm font-medium text-[#F4F7F5] hover:bg-[#151E1C] transition-all"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:brightness-110 active:scale-[0.98] text-[#111918] font-bold text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
          >
            {isCreating ? (
              <>
                <Loader2Icon className="size-4 animate-spin" />
                <span>Launching...</span>
              </>
            ) : (
              <>
                <PlusIcon className="size-4 stroke-[2.5]" />
                <span>Launch Session</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSessionModal;