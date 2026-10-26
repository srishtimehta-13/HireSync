import React from "react";
import { Link } from "react-router";

export function LogoSymbol({ size = 38, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${className}`}
    >
      <defs>
        <linearGradient id="hiresync-logo-left" x1="4" y1="6" x2="22" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B8F68" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="hiresync-logo-right" x1="26" y1="6" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#06C5D8" />
        </linearGradient>
        <linearGradient id="hiresync-play" x1="20" y1="18" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4F7F5" />
          <stop offset="100%" stopColor="#C4ECE5" />
        </linearGradient>
      </defs>

      {/* Background Pill/Hex Structure with Obsidian Surface */}
      <rect x="2" y="2" width="44" height="44" rx="12" fill="#1C2625" stroke="#2B3835" strokeWidth="1.5" />

      {/* Left Opposing Coding Bracket Structure (Interviewer / Host) */}
      <path
        d="M17 14L9 24L17 34"
        stroke="url(#hiresync-logo-left)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Opposing Coding Bracket Structure (Candidate / Participant) */}
      <path
        d="M31 14L39 24L31 34"
        stroke="url(#hiresync-logo-right)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Central Play / Sync Triangle Button */}
      <path
        d="M21 19.2C21 18.4 21.9 17.9 22.6 18.3L29.1 22.8C29.7 23.2 29.7 24.1 29.1 24.5L22.6 29C21.9 29.4 21 28.9 21 28.1V19.2Z"
        fill="url(#hiresync-play)"
      />

      {/* Live sync pulse indicator */}
      <circle cx="24" cy="9" r="2" fill="#10B981" />
    </svg>
  );
}

export default function Logo({
  withSubtitle = true,
  subtitle = "Better interviews, in sync.",
  compact = false,
  to = "/",
}) {
  const content = (
    <div className="group flex items-center gap-3 select-none">
      <LogoSymbol size={compact ? 36 : 42} />

      {!compact && (
        <div className="flex flex-col">
          <div className="font-heading font-bold text-2xl tracking-tight leading-none flex items-center">
            <span className="text-[#F4F7F5]">Hire</span>
            <span className="bg-gradient-to-r from-[#10B981] to-[#06C5D8] bg-clip-text text-transparent">
              Sync
            </span>
          </div>
          {withSubtitle && (
            <span className="text-[11px] font-medium text-[#94A3A0] tracking-tight mt-1 leading-none font-sans">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex items-center focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
