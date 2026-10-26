import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/codeRunner";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

  const { mutate: joinSession } = useJoinSession();
  const endSessionMutation = useEndSession();
  const joinAttemptedForSession = useRef(null);

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  // find the problem data based on session problem title
  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");

  // auto-join session if user is not already a participant and not the host
  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant || joinAttemptedForSession.current === id) return;

    joinAttemptedForSession.current = id;
    joinSession(id, { onSuccess: refetch });
  }, [session, user, loadingSession, isHost, isParticipant, id, joinSession, refetch]);

  // redirect the "participant" when session ends
  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  // update code when problem loads or changes
  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    const starterCode = problemData?.starterCode?.[newLang] || "";
    setCode(starterCode);
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    try {
      const result = await executeCode(selectedLanguage, code);
      setOutput(result);
    } finally {
      setIsRunning(false);
    }
  };

  const handleEndSession = () => {
    if (confirm("Are you sure you want to end this session? All participants will be disconnected.")) {
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  return (
    <div className="h-screen bg-[#111918] text-[#F4F7F5] flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* LEFT PANEL - PROBLEM DETAILS & CODE EDITOR */}
          <Panel defaultSize={55} minSize={30}>
            <PanelGroup direction="vertical">
              {/* TOP: PROBLEM DESCRIPTION */}
              <Panel defaultSize={45} minSize={20}>
                <div className="h-full overflow-y-auto bg-[#111918]">
                  {/* HEADER SECTION */}
                  <div className="p-5 bg-[#1C2625] border-b border-[#2B3835] sticky top-0 z-10">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h1 className="font-heading text-2xl font-bold text-[#F4F7F5] tracking-tight">
                            {session?.problem || "Loading Problem..."}
                          </h1>
                          <span
                            className={`text-xs font-mono uppercase px-2 py-0.5 rounded border shrink-0 ${
                              session?.difficulty === "easy"
                                ? "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30"
                                : session?.difficulty === "medium"
                                ? "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30"
                                : "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30"
                            }`}
                          >
                            {session?.difficulty
                              ? session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)
                              : "Easy"}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono text-[#94A3A0]">
                          <span>Host: {session?.host?.name || "Loading..."}</span>
                          <span>•</span>
                          <span>{session?.participant ? 2 : 1}/2 Engineers Connected</span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1.5 text-[#10B981]">
                            <span className="size-2 rounded-full bg-[#10B981]" />
                            Live Session
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            className="px-3.5 py-1.5 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 hover:bg-[#EF4444] hover:text-white text-[#EF4444] text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50"
                          >
                            {endSessionMutation.isPending ? (
                              <Loader2Icon className="size-3.5 animate-spin" />
                            ) : (
                              <LogOutIcon className="size-3.5" />
                            )}
                            End Session
                          </button>
                        )}
                        {session?.status === "completed" && (
                          <span className="px-2.5 py-1 rounded bg-[#151E1C] border border-[#2B3835] text-xs font-mono text-[#94A3A0]">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-5">
                    {/* Problem Description */}
                    {problemData?.description && (
                      <div className="rounded-2xl bg-[#1C2625] border border-[#2B3835] p-5">
                        <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#94A3A0] mb-3">
                          Problem Statement
                        </h2>
                        <div className="space-y-3 text-sm leading-relaxed text-[#F4F7F5]">
                          <p>{problemData.description.text}</p>
                          {problemData.description.notes?.map((note, idx) => (
                            <p key={idx} className="text-[#94A3A0] text-xs">
                              {note}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Examples Section */}
                    {problemData?.examples && problemData.examples.length > 0 && (
                      <div className="rounded-2xl bg-[#1C2625] border border-[#2B3835] p-5">
                        <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#94A3A0] mb-3">
                          Examples
                        </h2>

                        <div className="space-y-4">
                          {problemData.examples.map((example, idx) => (
                            <div key={idx} className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#151E1C] border border-[#2B3835] text-[#94A3A0]">
                                  #{idx + 1}
                                </span>
                                <p className="font-semibold text-xs text-[#F4F7F5]">Example {idx + 1}</p>
                              </div>
                              <div className="rounded-xl bg-[#151E1C] border border-[#2B3835] p-3.5 font-mono text-xs space-y-1">
                                <div className="flex gap-2">
                                  <span className="text-[#10B981] font-bold min-w-[65px]">Input:</span>
                                  <span className="text-[#F4F7F5]">{example.input}</span>
                                </div>
                                <div className="flex gap-2">
                                  <span className="text-[#06C5D8] font-bold min-w-[65px]">Output:</span>
                                  <span className="text-[#F4F7F5]">{example.output}</span>
                                </div>
                                {example.explanation && (
                                  <div className="pt-2 border-t border-[#2B3835] mt-2">
                                    <span className="text-[#94A3A0] font-sans text-xs">
                                      <span className="font-semibold text-[#F4F7F5]">Explanation:</span>{" "}
                                      {example.explanation}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Constraints */}
                    {problemData?.constraints && problemData.constraints.length > 0 && (
                      <div className="rounded-2xl bg-[#1C2625] border border-[#2B3835] p-5">
                        <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#94A3A0] mb-3">
                          Constraints
                        </h2>
                        <ul className="space-y-2 text-xs font-mono text-[#F4F7F5]">
                          {problemData.constraints.map((constraint, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#10B981]">•</span>
                              <code className="text-[#94A3A0]">{constraint}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-1.5 bg-[#2B3835] hover:bg-[#10B981] active:bg-[#06C5D8] transition-colors cursor-row-resize" />

              {/* BOTTOM: CODE EDITOR & OUTPUT */}
              <Panel defaultSize={55} minSize={25}>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={(value) => setCode(value)}
                      onRunCode={handleRunCode}
                    />
                  </Panel>

                  <PanelResizeHandle className="h-1.5 bg-[#2B3835] hover:bg-[#10B981] active:bg-[#06C5D8] transition-colors cursor-row-resize" />

                  <Panel defaultSize={30} minSize={15}>
                    <OutputPanel output={output} />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-[#2B3835] hover:bg-[#10B981] active:bg-[#06C5D8] transition-colors cursor-col-resize" />

          {/* RIGHT PANEL - VIDEO CALL & CHAT COLLABORATION */}
          <Panel defaultSize={45} minSize={25}>
            <div className="h-full bg-[#151E1C] p-3 overflow-hidden">
              {isInitializingCall ? (
                <div className="h-full flex flex-col items-center justify-center text-[#94A3A0]">
                  <Loader2Icon className="size-10 animate-spin text-[#10B981] mb-3" />
                  <p className="font-heading font-semibold text-base text-[#F4F7F5]">
                    Initializing Interview Room...
                  </p>
                  <p className="text-xs font-mono mt-1">Connecting WebRTC media streams</p>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center p-4">
                  <div className="rounded-2xl bg-[#1C2625] border border-[#2B3835] p-8 max-w-sm text-center">
                    <div className="size-14 mx-auto mb-4 rounded-2xl bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center justify-center">
                      <PhoneOffIcon className="size-7 text-[#EF4444]" />
                    </div>
                    <h2 className="font-heading text-lg font-bold text-[#F4F7F5] mb-1">
                      Connection Failed
                    </h2>
                    <p className="text-xs text-[#94A3A0]">
                      Unable to establish Stream media session. Check your camera/mic permissions and network.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;