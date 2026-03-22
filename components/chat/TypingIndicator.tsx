import LogoMark from "@/components/shared/LogoMark";

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 animate-fadeUp">
      <LogoMark size={30} />
      <div
        className="px-4 py-3 rounded-2xl rounded-tl-sm"
        style={{
          background: "#131929",
          border:     "0.5px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center gap-1.5 h-5">
          <div className="w-2 h-2 rounded-full animate-bounce3"       style={{ background: "#00C2FF" }} />
          <div className="w-2 h-2 rounded-full animate-bounce3-d1"    style={{ background: "#00C2FF" }} />
          <div className="w-2 h-2 rounded-full animate-bounce3-d2"    style={{ background: "#00C2FF" }} />
        </div>
      </div>
    </div>
  );
}
