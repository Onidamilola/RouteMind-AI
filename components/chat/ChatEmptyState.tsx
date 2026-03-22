import type { SuggestedPrompt } from "@/types";
import LogoMark from "@/components/shared/LogoMark";

const PROMPTS: SuggestedPrompt[] = [
  { label: "📦 Track a package",     text: "Where is my package #RM-4821?"                     },
  { label: "🔁 Reschedule delivery", text: "Can I reschedule my delivery to tomorrow?"           },
  { label: "📍 Update address",      text: "I need to change my delivery address."               },
  { label: "❓ Missing package",     text: "My package was marked delivered but it's not here." },
];

interface Props {
  onPrompt: (text: string) => void;
}

export default function ChatEmptyState({ onPrompt }: Props) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-8 px-6 py-16">
      {/* Brand lockup */}
      <div className="flex flex-col items-center gap-4">
        <div style={{ filter: "drop-shadow(0 0 32px rgba(0,102,255,0.4))" }}>
          <LogoMark size={64} />
        </div>
        <div className="text-center">
          <h2
            className="text-2xl font-bold tracking-tight mb-1 font-display"
            style={{ color: "#fff", letterSpacing: "-0.02em" }}
          >
            Route<span style={{ color: "#00C2FF" }}>Mind</span> AI
          </h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Your logistics support agent — available 24/7
          </p>
        </div>
      </div>

      {/* Suggested prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {PROMPTS.map((p) => (
          <button
            key={p.label}
            onClick={() => onPrompt(p.text)}
            className="group text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02]"
            style={{
              background:  "#131929",
              border:      "0.5px solid rgba(255,255,255,0.08)",
              color:       "rgba(255,255,255,0.6)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,194,255,0.25)";
              e.currentTarget.style.background  = "rgba(0,194,255,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.background  = "#131929";
            }}
          >
            <span className="block font-semibold mb-0.5 text-white">{p.label}</span>
            <span className="text-xs leading-snug">{p.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
