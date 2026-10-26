import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import Logo from "./Logo";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#111918]/90 backdrop-blur-md border-b border-[#2B3835] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Logo to="/" withSubtitle={true} subtitle="Meet. Code. Evaluate." />

        {/* NAVIGATION LINKS & USER PROFILE */}
        <div className="flex items-center gap-2">
          {/* PROBLEMS PAGE LINK */}
          <Link
            to="/problems"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
              isActive("/problems")
                ? "bg-[#10B981] text-[#111918] font-semibold shadow-sm"
                : "text-[#94A3A0] hover:text-[#F4F7F5] hover:bg-[#1C2625] border border-transparent hover:border-[#2B3835]"
            }`}
          >
            <BookOpenIcon className="size-4" />
            <span className="hidden sm:inline">Problems</span>
          </Link>

          {/* DASHBOARD PAGE LINK */}
          <Link
            to="/dashboard"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
              isActive("/dashboard")
                ? "bg-[#10B981] text-[#111918] font-semibold shadow-sm"
                : "text-[#94A3A0] hover:text-[#F4F7F5] hover:bg-[#1C2625] border border-transparent hover:border-[#2B3835]"
            }`}
          >
            <LayoutDashboardIcon className="size-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <div className="ml-3 pl-3 border-l border-[#2B3835] flex items-center">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "size-8 border border-[#2B3835] hover:border-[#06C5D8] transition-colors",
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;