import { ArrowRightIcon, CheckIcon, Code2Icon, TerminalIcon, VideoIcon, SparklesIcon, ShieldCheckIcon, CpuIcon } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import Logo from "../components/Logo";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#111918] text-[#F4F7F5] selection:bg-[#10B981]/20 selection:text-[#F4F7F5]">
      {/* NAVIGATION BAR */}
      <nav className="bg-[#111918]/85 backdrop-blur-md border-b border-[#2B3835] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <Logo to="/" withSubtitle={true} subtitle="Better interviews, in sync." />

          <div className="flex items-center gap-3">
            <SignInButton mode="modal">
              <button className="px-5 py-2.5 rounded-xl border border-[#2B3835] hover:border-[#10B981]/50 text-sm font-medium text-[#F4F7F5] bg-[#1C2625] hover:bg-[#1C2625]/80 transition-all duration-150">
                Sign In
              </button>
            </SignInButton>

            <SignInButton mode="modal">
              <button className="group px-5 py-2.5 bg-[#10B981] hover:brightness-110 active:scale-[0.98] rounded-xl text-[#111918] font-bold text-sm shadow-md transition-all duration-150 flex items-center gap-2">
                <span>Start Free</span>
                <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#10B981]/10 via-[#06C5D8]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* LEFT EDITORIAL CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#1C2625] border border-[#2B3835] text-xs font-mono text-[#94A3A0]">
              <span className="size-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[#F4F7F5] font-semibold">HireSync Live 2.0</span>
              <span className="text-[#2B3835]">•</span>
              <span>Developer-First Technical Interviews</span>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-[#F4F7F5]">
              Meet. Code. <br />
              <span className="bg-gradient-to-r from-[#10B981] to-[#06C5D8] bg-clip-text text-transparent">
                Evaluate.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#94A3A0] leading-relaxed max-w-2xl font-sans">
              The high-fidelity technical interview platform. Real-time collaborative code editor,
              instant multi-language execution, and crystal-clear low-latency video — engineered for modern engineering teams.
            </p>

            {/* VALUE PROPOSITION BADGES */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1C2625] border border-[#2B3835] text-xs font-medium text-[#F4F7F5]">
                <CheckIcon className="size-3.5 text-[#10B981]" /> HD Video & Chat
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1C2625] border border-[#2B3835] text-xs font-medium text-[#F4F7F5]">
                <CheckIcon className="size-3.5 text-[#10B981]" /> Monaco Editor
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1C2625] border border-[#2B3835] text-xs font-medium text-[#F4F7F5]">
                <CheckIcon className="size-3.5 text-[#10B981]" /> Isolated Runtime Sandbox
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1C2625] border border-[#2B3835] text-xs font-medium text-[#F4F7F5]">
                <CheckIcon className="size-3.5 text-[#10B981]" /> Curated Problem Bank
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <SignInButton mode="modal">
                <button className="px-7 py-3.5 bg-[#10B981] hover:brightness-110 active:scale-[0.98] rounded-xl text-[#111918] font-bold text-base shadow-lg transition-all duration-150 flex items-center gap-3">
                  <span>Start Live Session</span>
                  <ArrowRightIcon className="size-5" />
                </button>
              </SignInButton>

              <a
                href="#features"
                className="px-6 py-3.5 rounded-xl border border-[#2B3835] hover:border-[#94A3A0]/60 text-sm font-semibold text-[#F4F7F5] bg-[#1C2625]/60 hover:bg-[#1C2625] transition-all duration-150 flex items-center gap-2"
              >
                <span>Explore Features</span>
              </a>
            </div>

            {/* STATS METRICS */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#2B3835]/80">
              <div>
                <div className="font-heading text-2xl sm:text-3xl font-bold text-[#F4F7F5]">
                  &lt; 50ms
                </div>
                <div className="text-xs text-[#94A3A0] mt-1 font-mono">Sync Latency</div>
              </div>
              <div>
                <div className="font-heading text-2xl sm:text-3xl font-bold text-[#10B981]">
                  100%
                </div>
                <div className="text-xs text-[#94A3A0] mt-1 font-mono">Real-time Isolation</div>
              </div>
              <div>
                <div className="font-heading text-2xl sm:text-3xl font-bold text-[#06C5D8]">
                  99.9%
                </div>
                <div className="text-xs text-[#94A3A0] mt-1 font-mono">Platform Uptime</div>
              </div>
            </div>
          </div>

          {/* RIGHT PRODUCT INTERVIEW ROOM PREVIEW */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-[#1C2625] border border-[#2B3835] shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="h-10 bg-[#151E1C] border-b border-[#2B3835] px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#2B3835]" />
                  <span className="size-2.5 rounded-full bg-[#2B3835]" />
                  <span className="size-2.5 rounded-full bg-[#2B3835]" />
                  <span className="text-xs font-mono text-[#94A3A0] ml-2">session_interview.js</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#10B981]">
                  <span className="size-2 rounded-full bg-[#10B981]" />
                  Connected
                </div>
              </div>

              {/* Code Preview Mockup */}
              <div className="p-5 font-mono text-xs sm:text-sm space-y-2 text-[#F4F7F5] bg-[#111918]">
                <p className="text-[#94A3A0]">
                  <span className="text-[#06C5D8]">// HireSync Interactive Workspace</span>
                </p>
                <p>
                  <span className="text-[#10B981]">function</span>{" "}
                  <span className="text-[#06C5D8]">twoSum</span>(nums, target) &#123;
                </p>
                <p className="pl-4 text-[#94A3A0]">const map = new Map();</p>
                <p className="pl-4">
                  for (let i = 0; i &lt; nums.length; i++) &#123;
                </p>
                <p className="pl-8 text-[#94A3A0]">const complement = target - nums[i];</p>
                <p className="pl-8">
                  if (map.has(complement)) return [map.get(complement), i];
                </p>
                <p className="pl-8 text-[#94A3A0]">map.set(nums[i], i);</p>
                <p className="pl-4">&#125;</p>
                <p>&#125;</p>
              </div>

              {/* Real-time Status Card */}
              <div className="p-4 bg-[#1C2625] border-t border-[#2B3835] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-[#151E1C] border border-[#2B3835] flex items-center justify-center">
                    <TerminalIcon className="size-4 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#F4F7F5]">Test Suite Passed</p>
                    <p className="text-[11px] text-[#94A3A0] font-mono">Runtime: 12ms • Memory: 42MB</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xs font-bold font-mono">
                  ACCEPTED
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE BRAND PILLARS */}
      <section id="features" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[#2B3835]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase font-mono tracking-widest text-[#10B981] mb-3">
            Architected for Engineers
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F7F5]">
            Developer-First. Precise. Collaborative.
          </h2>
          <p className="text-[#94A3A0] mt-4 text-base sm:text-lg">
            Every feature is fine-tuned to eliminate friction and let candidates and interviewers focus on real problem solving.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* FEATURE 1 */}
          <div className="rounded-2xl bg-[#1C2625] border border-[#2B3835] p-7 space-y-4 hover:border-[#10B981]/40 transition-colors">
            <div className="size-12 rounded-xl bg-[#151E1C] border border-[#2B3835] flex items-center justify-center">
              <VideoIcon className="size-6 text-[#10B981]" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#F4F7F5]">HD Video & Sub-Second Audio</h3>
            <p className="text-sm text-[#94A3A0] leading-relaxed">
              Crystal-clear Stream-powered WebRTC video calls, low-latency audio sync, and integrated session messaging with zero external software required.
            </p>
          </div>

          {/* FEATURE 2 */}
          <div className="rounded-2xl bg-[#1C2625] border border-[#2B3835] p-7 space-y-4 hover:border-[#06C5D8]/40 transition-colors">
            <div className="size-12 rounded-xl bg-[#151E1C] border border-[#2B3835] flex items-center justify-center">
              <Code2Icon className="size-6 text-[#06C5D8]" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#F4F7F5]">Professional Monaco Editor</h3>
            <p className="text-sm text-[#94A3A0] leading-relaxed">
              VS Code's world-class editor with syntax highlighting, line numbers, automatic bracket matching, and intelligent multi-language support.
            </p>
          </div>

          {/* FEATURE 3 */}
          <div className="rounded-2xl bg-[#1C2625] border border-[#2B3835] p-7 space-y-4 hover:border-[#10B981]/40 transition-colors">
            <div className="size-12 rounded-xl bg-[#151E1C] border border-[#2B3835] flex items-center justify-center">
              <CpuIcon className="size-6 text-[#10B981]" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#F4F7F5]">Isolated Sandbox Execution</h3>
            <p className="text-sm text-[#94A3A0] leading-relaxed">
              Execute JavaScript, Python, and Java in secure online sandboxes. Verify test cases and benchmark time/space complexity.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#2B3835] bg-[#111918] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo to="/" withSubtitle={true} subtitle="Developer-first technical interviews" />
          <p className="text-xs text-[#94A3A0] font-mono">
            © {new Date().getFullYear()} HireSync. Meet. Code. Evaluate.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;