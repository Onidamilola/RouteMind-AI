import type { Message } from "@/types";
import { formatTime } from "@/lib/utils";
import LogoMark from "@/components/shared/LogoMark";

// ─── Blinking cursor shown while a message is streaming ──────────────────────

function StreamCursor() {
  return (
    <>
      <style>{`
        @keyframes streamCursor {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }
      `}</style>
      <span
        className="inline-block w-0.5 h-3.5 ml-0.5 align-middle rounded-sm"
        style={{ background: "#00C2FF", animation: "streamCursor .65s ease-in-out infinite" }}
      />
    </>
  );
}

// ─── Inline bold + newline renderer ──────────────────────────────────────────

function renderContent(text: string) {
  return text.split("\n").map((line, i, arr) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          j % 2 === 1 ? (
            <strong key={j} className="font-semibold text-white">
              {part}
            </strong>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end items-end gap-3 w-full animate-fadeUp">
        <div className="flex flex-col items-end gap-1 max-w-md">
          <div
            className="px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed"
            style={{
              background: "rgba(0,194,255,0.1)",
              border:     "0.5px solid rgba(0,194,255,0.22)",
              color:      "rgba(255,255,255,0.9)",
            }}
          >
            {message.content}
          </div>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
            {formatTime(message.timestamp)}
          </span>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold"
          style={{
            background: "rgba(255,255,255,0.07)",
            color:      "rgba(255,255,255,0.55)",
            border:     "0.5px solid rgba(255,255,255,0.1)",
          }}
        >
          You
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 w-full animate-fadeUp">
      <LogoMark size={30} />
      <div className="flex flex-col gap-1">
        <div
          className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed max-w-lg"
          style={{
            background:  "#131929",
            border:      message.streaming
              ? "0.5px solid rgba(0,194,255,0.2)"
              : "0.5px solid rgba(255,255,255,0.07)",
            color:       "rgba(255,255,255,0.72)",
            transition:  "border-color .3s ease",
          }}
        >
          {/* Show a single space placeholder so the bubble has height before tokens arrive */}
          {message.content === "" ? (
            <span style={{ opacity: 0 }}>…</span>
          ) : (
            renderContent(message.content)
          )}
          {message.streaming && <StreamCursor />}
        </div>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
          {message.streaming
            ? "RouteMind AI · typing…"
            : `RouteMind AI · ${formatTime(message.timestamp)}`}
        </span>
      </div>
    </div>
  );
}
