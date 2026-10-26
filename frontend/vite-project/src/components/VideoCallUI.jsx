import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon, RadioIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Channel, Chat, MessageComposer, MessageList, Thread, Window } from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/index.css";

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-[#94A3A0]">
        <Loader2Icon className="size-10 animate-spin text-[#10B981] mb-3" />
        <p className="font-heading font-semibold text-sm text-[#F4F7F5]">Connecting Call...</p>
        <p className="text-xs font-mono mt-1">Establishing peer-to-peer media stream</p>
      </div>
    );
  }

  return (
    <div className="h-full flex gap-3 relative str-video overflow-hidden">
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        {/* TOP STATUS BAR */}
        <div className="flex items-center justify-between gap-2 bg-[#1C2625] border border-[#2B3835] px-4 py-2.5 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#10B981]">
              <span className="size-2 rounded-full bg-[#10B981]" />
              <span className="font-semibold">Connected</span>
            </div>
            <span className="text-[#2B3835]">•</span>
            <div className="flex items-center gap-1.5 text-xs text-[#94A3A0] font-mono">
              <UsersIcon className="size-3.5" />
              <span>
                {participantCount} {participantCount === 1 ? "participant" : "participants"}
              </span>
            </div>
          </div>

          {chatClient && channel && (
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isChatOpen
                  ? "bg-[#10B981] text-[#111918]"
                  : "bg-[#151E1C] border border-[#2B3835] text-[#F4F7F5] hover:border-[#10B981]/40"
              }`}
              title={isChatOpen ? "Hide chat" : "Show chat"}
            >
              <MessageSquareIcon className="size-3.5" />
              <span>Chat</span>
            </button>
          )}
        </div>

        {/* SPEAKER / VIDEO LAYOUT */}
        <div className="flex-1 bg-[#111918] border border-[#2B3835] rounded-xl overflow-hidden relative">
          <SpeakerLayout />
        </div>

        {/* BOTTOM CONTROLS */}
        <div className="bg-[#1C2625] border border-[#2B3835] py-2 px-4 rounded-xl flex justify-center shadow-lg">
          <CallControls onLeave={() => navigate("/dashboard")} />
        </div>
      </div>

      {/* CHAT DRAWER */}
      {chatClient && channel && (
        <div
          className={`flex flex-col rounded-xl border border-[#2B3835] bg-[#1C2625] overflow-hidden transition-all duration-200 ease-in-out shrink-0 ${
            isChatOpen ? "w-80 opacity-100" : "w-0 opacity-0 pointer-events-none border-0"
          }`}
        >
          {isChatOpen && (
            <>
              <div className="bg-[#151E1C] px-4 py-3 border-b border-[#2B3835] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquareIcon className="size-4 text-[#06C5D8]" />
                  <h3 className="font-heading font-bold text-sm text-[#F4F7F5]">Session Chat</h3>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-[#94A3A0] hover:text-[#F4F7F5] transition-colors p-1 rounded-lg hover:bg-[#1C2625]"
                  title="Close chat"
                >
                  <XIcon className="size-4" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden stream-chat-dark bg-[#111918]">
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={channel}>
                    <Window>
                      <MessageList />
                      <MessageComposer />
                    </Window>
                    <Thread />
                  </Channel>
                </Chat>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default VideoCallUI;