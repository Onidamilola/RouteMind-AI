import Link from "next/link";
import LogoMark from "@/components/shared/LogoMark";

export function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden text-center" style={{ padding:"120px 32px", background:"#0F1524" }}>
      <div className="absolute rounded-full pointer-events-none" style={{ width:600,height:300, background:"radial-gradient(ellipse,rgba(0,102,255,0.22) 0%,transparent 65%)", top:"50%",left:"50%",transform:"translate(-50%,-50%)",filter:"blur(60px)" }} />

      <div className="relative max-w-2xl mx-auto">
        <p className="reveal text-xs font-semibold font-display mb-4" style={{ color:"#00C2FF", letterSpacing:"0.14em", textTransform:"uppercase" }}>
          Start today — free
        </p>
        <h2 className="reveal font-display font-extrabold text-white mb-5" style={{ fontSize:"clamp(36px,5vw,64px)", letterSpacing:"-0.03em", lineHeight:1.05 }}>
          Every day without RouteMind
          <br />is <span style={{ color:"#00C2FF" }}>tickets you didn&apos;t need.</span>
        </h2>
        <p className="reveal text-base leading-relaxed mb-4 mx-auto" style={{ color:"rgba(255,255,255,0.48)", maxWidth:500, fontWeight:300 }}>
          500+ logistics teams have already cut support workload by 40%, automated 2M+ delivery inquiries, and tripled CSAT — without adding a single hire.
        </p>

        {/* Mini feature list */}
        <div className="reveal flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mb-10">
          {[
            "✓ Reduce support tickets by 40%",
            "✓ Automate delivery inquiries instantly",
            "✓ Track 120+ shipments in real-time",
          ].map((p) => (
            <span key={p} style={{ color:"rgba(255,255,255,0.5)" }}>{p}</span>
          ))}
        </div>

        <div className="reveal flex gap-3 justify-center mb-6">
          <Link
            href="/chat"
            className="px-9 py-4 rounded-xl text-base font-medium transition-all duration-150 hover:opacity-85 hover:-translate-y-px"
            style={{ background:"#00C2FF", color:"#080C18", textDecoration:"none" }}
          >
            Start free — no card needed
          </Link>
          <Link
            href="/track"
            className="flex items-center gap-2 px-7 py-4 rounded-xl text-base transition-all duration-200"
            style={{ background:"transparent", color:"rgba(255,255,255,0.55)", border:"0.5px solid rgba(255,255,255,0.13)", textDecoration:"none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color="#fff"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.28)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.55)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.13)"; }}
          >
            Try live tracking →
          </Link>
        </div>

        <p className="reveal text-xs" style={{ color:"rgba(255,255,255,0.25)" }}>
          Free plan · Setup in under 2 hours · Cancel anytime · No engineering required
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-8 lg:px-14 py-10" style={{ borderTop:"0.5px solid rgba(255,255,255,0.07)" }}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <LogoMark size={26} />
            <span className="font-display font-bold text-sm" style={{ color:"rgba(255,255,255,0.55)" }}>
              Route<span style={{ color:"#00C2FF" }}>Mind</span> AI
            </span>
          </div>
          <p className="text-xs" style={{ color:"rgba(255,255,255,0.22)", maxWidth:220 }}>
            Automate delivery inquiries instantly. Reduce support tickets by 40%.
          </p>
        </div>

        {/* Link groups */}
        <div className="flex flex-wrap gap-x-16 gap-y-6">
          <div>
            <p className="text-xs font-semibold font-display mb-3" style={{ color:"rgba(255,255,255,0.3)", letterSpacing:"0.08em", textTransform:"uppercase" }}>Product</p>
            {[{ label:"AI Chat", href:"/chat" },{ label:"Track Shipment", href:"/track" },{ label:"Admin Dashboard", href:"/admin" }].map(({ label, href }) => (
              <Link key={label} href={href} className="block text-xs mb-2 transition-colors duration-150" style={{ color:"rgba(255,255,255,0.28)", textDecoration:"none" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.28)")}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold font-display mb-3" style={{ color:"rgba(255,255,255,0.3)", letterSpacing:"0.08em", textTransform:"uppercase" }}>Company</p>
            {["About","Blog","Careers","Press"].map((l) => (
              <a key={l} href="#" className="block text-xs mb-2 transition-colors duration-150" style={{ color:"rgba(255,255,255,0.28)", textDecoration:"none" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.28)")}>
                {l}
              </a>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold font-display mb-3" style={{ color:"rgba(255,255,255,0.3)", letterSpacing:"0.08em", textTransform:"uppercase" }}>Legal</p>
            {["Privacy","Terms","Security","Status"].map((l) => (
              <a key={l} href="#" className="block text-xs mb-2 transition-colors duration-150" style={{ color:"rgba(255,255,255,0.28)", textDecoration:"none" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.28)")}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-10 pt-6" style={{ borderTop:"0.5px solid rgba(255,255,255,0.06)" }}>
        <p className="text-xs" style={{ color:"rgba(255,255,255,0.2)" }}>© 2025 RouteMind AI, Inc. All rights reserved.</p>
        <p className="text-xs" style={{ color:"rgba(255,255,255,0.2)" }}>Built for the modern logistics team.</p>
      </div>
    </footer>
  );
}
