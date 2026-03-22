"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addUserMessage, clearChat, clearError, sendMessage } from "@/store/slices/chatSlice";
import ChatBubble      from "@/components/chat/ChatBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import ChatEmptyState  from "@/components/chat/ChatEmptyState";
import ChatInput       from "@/components/chat/ChatInput";
import LogoMark        from "@/components/shared/LogoMark";

// ─── Error banner ─────────────────────────────────────────────────────────────

function ErrorBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div
      className="flex items-start justify-between gap-3 px-4 py-3 mx-4 mb-2 rounded-xl text-sm"
      style={{
        background: "rgba(255,80,80,0.08)",
        border:     "0.5px solid rgba(255,80,80,0.25)",
        color:      "rgba(255,120,120,0.9)",
      }}
    >
      <div className="flex items-start gap-2.5">
        <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
          <path d="M7 4v3.5M7 9.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span>{message}</span>
      </div>
      <button
        onClick={onDismiss}
        className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss error"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

// ─── Chat header ─────────────────────────────────────────────────────────────

function ChatHeader({
  messageCount,
  isStreaming,
  onClear,
}: {
  messageCount: number;
  isStreaming:  boolean;
  onClear:      () => void;
}) {
  return (
    <header
      className="flex-shrink-0 flex items-center justify-between px-5 py-4 z-10"
      style={{
        background:     "rgba(8,12,24,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom:   "0.5px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Logo + status */}
      <div className="flex items-center gap-3">
        <LogoMark size={34} />
        <div>
          <h1
            className="font-display font-bold text-white leading-none"
            style={{ fontSize: 15, letterSpacing: "-0.01em" }}
          >
            Route<span style={{ color: "#00C2FF" }}>Mind</span> AI
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            {isStreaming ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse2" style={{ background: "#00C2FF" }} />
                <span className="text-xs" style={{ color: "#00C2FF" }}>Typing…</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse2" style={{ background: "#3CDC78" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>
                  Online · responds instantly
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Live metrics pill */}
        <div
          className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl text-xs"
          style={{
            background: "#131929",
            border:     "0.5px solid rgba(255,255,255,0.07)",
            color:      "rgba(255,255,255,0.38)",
          }}
        >
          <span><span style={{ color: "#00C2FF", fontWeight: 600 }}>247</span> active</span>
          <span className="w-px h-3" style={{ background: "rgba(255,255,255,0.1)" }} />
          <span><span style={{ color: "#00C2FF", fontWeight: 600 }}>&lt;1s</span> avg reply</span>
          <span className="w-px h-3" style={{ background: "rgba(255,255,255,0.1)" }} />
          <span><span style={{ color: "#3CDC78", fontWeight: 600 }}>99%</span> uptime</span>
        </div>

        {messageCount > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-150"
            style={{ color: "rgba(255,255,255,0.35)", border: "0.5px solid rgba(255,255,255,0.07)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color       = "rgba(255,255,255,0.65)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color       = "rgba(255,255,255,0.35)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
            }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            New chat
          </button>
        )}

        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-150"
          style={{ color: "rgba(255,255,255,0.35)", border: "0.5px solid rgba(255,255,255,0.07)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color       = "rgba(255,255,255,0.65)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color       = "rgba(255,255,255,0.35)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
          }}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M8 1L3 6l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </Link>
      </div>
    </header>
  );
}

// ─── Chat page ────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const dispatch    = useAppDispatch();
  const messages    = useAppSelector((s) => s.chat.messages);
  const isLoading   = useAppSelector((s) => s.chat.isLoading);
  const isStreaming  = useAppSelector((s) => s.chat.isStreaming);
  const error       = useAppSelector((s) => s.chat.error);
  const bottomRef   = useRef<HTMLDivElement>(null);

  // Auto-scroll on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isStreaming]);

  const handleSend = (text: string) => {
    dispatch(addUserMessage(text));
    dispatch(sendMessage(text));
  };

  return (
    <div
      className="flex flex-col h-screen w-full"
      style={{ background: "#080C18", fontFamily: "var(--font-dm)" }}
    >
      <div className="grid-bg fixed inset-0 pointer-events-none" />

      <ChatHeader
        messageCount={messages.length}
        isStreaming={isStreaming}
        onClear={() => dispatch(clearChat())}
      />

      {/* Message list */}
      <div className="flex-1 overflow-y-auto relative">
        <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-5 min-h-full">
          {messages.length === 0 && !isLoading ? (
            <ChatEmptyState onPrompt={handleSend} />
          ) : (
            <>
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {/* Show typing indicator only before first token arrives */}
              {isLoading && !isStreaming && <TypingIndicator />}
            </>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Error banner sits above input */}
      {error && (
        <ErrorBanner
          message={error}
          onDismiss={() => dispatch(clearError())}
        />
      )}

      <ChatInput onSend={handleSend} disabled={isLoading || isStreaming} />
    </div>
  );
}
