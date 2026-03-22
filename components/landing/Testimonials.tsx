const TESTIMONIALS = [
  {
    quote:    "We reduced inbound support tickets by 43% in the first week. RouteMind handles every 'where is my package' question before it even hits our queue. Our team now spends time on real problems.",
    name:     "Amara L.",
    title:    "Head of CX, FreightFlow",
    metric:   "43% ticket reduction",
    initials: "AL",
    gradient: "linear-gradient(135deg,#00C2FF,#0066FF)",
  },
  {
    quote:    "Setup was literally 90 minutes. By the next morning RouteMind was handling 300+ daily inquiries and our agents were only dealing with escalations. Morale went up. Costs went down.",
    name:     "David K.",
    title:    "VP Operations, NorthShip",
    metric:   "300 inquiries/day automated",
    initials: "DK",
    gradient: "linear-gradient(135deg,#FF6B35,#FF3366)",
  },
  {
    quote:    "We went from 3.2 to 4.7 CSAT in 6 weeks. Customers couldn't believe how fast they were getting tracking updates. RouteMind ROI'd in the first billing cycle — it wasn't close.",
    name:     "Sofia C.",
    title:    "Director of Support, PackLink",
    metric:   "3.2 → 4.7 CSAT score",
    initials: "SC",
    gradient: "linear-gradient(135deg,#3CDC78,#0066FF)",
  },
];

const STARS = Array(5).fill("★");

export default function Testimonials() {
  return (
    <section id="customers" className="relative overflow-hidden" style={{ padding:"120px 32px" }}>
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-xs font-semibold font-display mb-4 text-center" style={{ color:"#00C2FF", letterSpacing:"0.14em", textTransform:"uppercase" }}>
          Customer results
        </p>
        <h2 className="reveal font-display font-extrabold text-white mb-4 text-center mx-auto" style={{ fontSize:"clamp(32px,4.5vw,56px)", letterSpacing:"-0.03em", lineHeight:1.08, maxWidth:560 }}>
          Real numbers. Real teams.
        </h2>
        <p className="reveal text-base leading-relaxed mb-16 text-center mx-auto" style={{ color:"rgba(255,255,255,0.45)", maxWidth:440, fontWeight:300 }}>
          Not projections — these are outcomes from logistics teams running RouteMind in production today.
        </p>

        <div className="grid gap-5" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))" }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="reveal p-8 rounded-2xl flex flex-col transition-all duration-250 hover:-translate-y-1"
              style={{ background:"#131929", border:"0.5px solid rgba(255,255,255,0.07)", transitionDelay:`${i*0.1}s` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,194,255,0.18)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
            >
              {/* Stars + metric */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-1">
                  {STARS.map((s, j) => <span key={j} style={{ color:"#FFA03C", fontSize:13 }}>{s}</span>)}
                </div>
                <span
                  className="text-xs font-semibold font-display px-2.5 py-1 rounded-full"
                  style={{ background:"rgba(60,220,120,0.1)", color:"#3CDC78", letterSpacing:"0.04em" }}
                >
                  {t.metric}
                </span>
              </div>

              <p className="flex-1 text-sm leading-relaxed mb-6 italic" style={{ color:"rgba(255,255,255,0.72)", fontWeight:300 }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
                     style={{ background:t.gradient, color:"#080C18" }}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-white">{t.name}</div>
                  <div className="text-xs mt-0.5" style={{ color:"rgba(255,255,255,0.45)" }}>{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="reveal mt-14 flex flex-wrap justify-center gap-8">
          {[
            { val:"500+",  label:"Logistics teams" },
            { val:"2M+",   label:"Inquiries automated" },
            { val:"40%",   label:"Avg ticket reduction" },
            { val:"4.8★",  label:"Average CSAT score" },
            { val:"< 1s",  label:"AI response time" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-display font-extrabold" style={{ fontSize:24, color:"#fff", letterSpacing:"-0.025em" }}>{m.val}</div>
              <div className="text-xs mt-1" style={{ color:"rgba(255,255,255,0.35)" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
