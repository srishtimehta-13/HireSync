export const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30";
    case "medium":
      return "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30";
    case "hard":
      return "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30";
    default:
      return "bg-[#151E1C] text-[#94A3A0] border-[#2B3835]";
  }
};