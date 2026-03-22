const STEPS = [
  {
    num:      "01",
    time:     "Day 1 · 30 minutes",
    title:    "Connect your carrier APIs",
    body:     "Plug in FedEx, UPS, DHL, USPS, or any carrier. RouteMind pulls live tracking data automatically — no scraping, no webhooks to build. Works with your existing OMS too.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="3" stroke="#00C2FF" strokeWidth="1.2"/>
        <path d="M6 9h6M9 6v6" stroke="#00C2FF" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num:      "02",
    time:     "Day 1 · 60 minutes",
    title:    "Train on your support content",
    body:     "Upload your FAQ docs, escalation policies, and brand guidelines. RouteMind learns your voice, your rules, and when to escalate — so every response sounds like you, not a robot.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="#00C2FF" strokeWidth="1.2"/>
        <path d="M6.5 9l2 2 3-3" stroke="#00C2FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num:      "03",
    time:     "Day 2 · Go live",
    title:    "Deploy and watch tickets drop",
    body:     "Embed on your site, connect to Intercom, Zendesk, or email. RouteMind starts handling inquiries immediately. Most teams see a 40% ticket reduction within the first week.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 9l4 4 8-8" stroke="#00C2FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="4" r="2" fill="#00C2FF" opacity="0.3"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden" style={{ padding:"120px 32px", background:"#0F1524" }}>
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-xs font-semibold font-display mb-4 text-center" style={{ color:"#00C2FF", letterSpacing:"0.14em", textTransform:"uppercase" }}>
          How it works
        </p>
        <h2 className="reveal font-display font-extrabold text-white mb-4 text-center mx-auto" style={{ fontSize:"clamp(32px,4.5vw,56px)", letterSpacing:"-0.03em", lineHeight:1.08, maxWidth:560 }}>
          Live in 2 hours. Results in 2 days.
        </h2>
        <p className="reveal text-base leading-relaxed mb-14 text-center mx-auto" style={{ color:"rgba(255,255,255,0.45)", maxWidth:460, fontWeight:300 }}>
          No engineering sprints. No months-long implementations. RouteMind is built for operators, not developers.
        </p>

        <div className="reveal grid rounded-2xl overflow-hidden" style={{ gridTemplateColumns:"repeat(3,1fr)", gap:2, background:"rgba(255,255,255,0.07)" }}>
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="relative p-10 transition-colors duration-250 cursor-default"
              style={{ background:"#131929" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#161d30")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#131929")}
            >
              <div className="absolute top-10 right-9 w-10 h-10 flex items-center justify-center rounded-xl"
                   style={{ background:"rgba(0,194,255,0.08)", border:"0.5px solid rgba(0,194,255,0.15)" }}>
                {s.icon}
              </div>
              <div className="font-display font-extrabold mb-2" style={{ fontSize:56, lineHeight:1, letterSpacing:"-0.04em", color:"rgba(0,194,255,0.1)" }}>
                {s.num}
              </div>
              <div className="text-xs font-semibold font-display mb-4" style={{ color:"rgba(0,194,255,0.6)", letterSpacing:"0.06em", textTransform:"uppercase" }}>
                {s.time}
              </div>
              <h3 className="font-display font-bold text-white mb-3" style={{ fontSize:19 }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color:"rgba(255,255,255,0.5)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
