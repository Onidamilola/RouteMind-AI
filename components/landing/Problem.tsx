import { STATS } from "@/data/shipments";

const PROBLEMS = [
  {
    icon:  "📦",
    color: "rgba(255,80,80,0.1)",
    stat:  `${Math.round((STATS.in_transit / STATS.total) * 100)}%`,
    statLabel: "of tickets are just tracking questions",
    title: '"Where is my package?" — on repeat',
    body:  "Your support inbox is dominated by delivery status questions that take 30 seconds to answer manually. Multiply that by hundreds of customers every day and you've lost thousands of hours.",
  },
  {
    icon:  "⏱",
    color: "rgba(255,160,60,0.1)",
    stat:  "4.2hr",
    statLabel: "average human response time",
    title: "Customers don't wait 4 hours",
    body:  "When a shipment is delayed, customers want answers in seconds. Every hour they wait without an update is a negative review, a chargeback request, or a churned customer.",
  },
  {
    icon:  "📉",
    color: "rgba(0,194,255,0.1)",
    stat:  `${STATS.delayed}`,
    statLabel: "delayed shipments need proactive updates",
    title: "Delays spiral without automation",
    body:  "Delayed shipments don't just affect one customer — they generate 3–5× more support contacts. Without automated proactive outreach, your team drowns in follow-ups.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="relative overflow-hidden" style={{ padding:"120px 32px", background:"#0F1524" }}>
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-xs font-semibold font-display mb-4" style={{ color:"#00C2FF", letterSpacing:"0.14em", textTransform:"uppercase" }}>
          The problem
        </p>
        <h2 className="reveal font-display font-extrabold text-white mb-5" style={{ fontSize:"clamp(32px,4.5vw,56px)", letterSpacing:"-0.03em", lineHeight:1.08, maxWidth:680 }}>
          Your support team is solving the wrong problems.
        </h2>
        <p className="reveal text-base leading-relaxed mb-14" style={{ color:"rgba(255,255,255,0.48)", maxWidth:540, fontWeight:300 }}>
          The majority of logistics support tickets are repetitive, low-value queries that AI can answer instantly. Every minute your team spends on them is a minute not spent on real customer issues.
        </p>

        <div className="grid gap-5" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))" }}>
          {PROBLEMS.map((p, i) => (
            <div
              key={p.title}
              className="reveal p-8 rounded-2xl transition-all duration-250 hover:-translate-y-1"
              style={{ background:"#131929", border:"0.5px solid rgba(255,255,255,0.07)", transitionDelay:`${i*0.1}s` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,194,255,0.2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4" style={{ background:p.color }}>
                {p.icon}
              </div>
              {/* Live data callout */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display font-extrabold" style={{ fontSize:32, letterSpacing:"-0.03em", color:"#00C2FF" }}>{p.stat}</span>
                <span className="text-xs" style={{ color:"rgba(255,255,255,0.4)" }}>{p.statLabel}</span>
              </div>
              <h3 className="font-display font-bold mb-3" style={{ fontSize:17, color:"#fff" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color:"rgba(255,255,255,0.5)" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
