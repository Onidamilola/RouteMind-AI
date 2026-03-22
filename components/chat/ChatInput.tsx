"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface Props {
  onSend:    (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: Props) {
  const [value, setValue] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }, [value]);

  const submit = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="flex-shrink-0 px-4 py-4" style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-3xl mx-auto">
        {/* Input wrapper */}
        <div
          className="flex items-end gap-3 px-4 py-3 rounded-2xl transition-all duration-200"
          style={{
            background: "#131929",
            border:     "0.5px solid rgba(255,255,255,0.09)",
          }}
          onFocusCapture={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,194,255,0.3)";
            (e.currentTarget as HTMLDivElement).style.boxShadow   = "0 0 0 3px rgba(0,194,255,0.06)";
          }}
          onBlurCapture={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.09)";
            (e.currentTarget as HTMLDivElement).style.boxShadow   = "none";
          }}
        >
          <textarea
            ref={taRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about a delivery, tracking update, or issue…"
            disabled={disabled}
            className="flex-1 resize-none bg-transparent text-sm leading-relaxed focus:outline-none disabled:opacity-50"
            style={{
              color:       "rgba(255,255,255,0.85)",
              maxHeight:   160,
              overflow:    "auto",
              caretColor:  "#00C2FF",
              fontFamily:  "var(--font-dm)",
            }}
          />

          {/* Send button */}
          <button
            onClick={submit}
            disabled={!canSend}
            className="flex items-center justify-center rounded-xl flex-shrink-0 transition-all duration-150"
            style={{
              width:      36,
              height:     36,
              background: canSend
                ? "linear-gradient(135deg, #00C2FF, #0066FF)"
                : "rgba(255,255,255,0.06)",
              cursor:  canSend ? "pointer" : "not-allowed",
              opacity: canSend ? 1 : 0.4,
            }}
          >
            {disabled ? (
              <div
                className="w-4 h-4 rounded-full border-2"
                style={{
                  borderColor:    "rgba(255,255,255,0.4)",
                  borderTopColor: "transparent",
                  animation:      "spin .8s linear infinite",
                }}
              />
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 8h12M10 4l4 4-4 4"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Hint */}
        <p className="text-center text-xs mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>
          <kbd className="px-1 py-0.5 rounded text-xs"
            style={{ background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
            Enter
          </kbd>{" "}to send ·{" "}
          <kbd className="px-1 py-0.5 rounded text-xs"
            style={{ background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
            Shift+Enter
          </kbd>{" "}for new line
        </p>
      </div>
    </div>
  );
}
