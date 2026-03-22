"use client";

import Link from "next/link";
import LogoMark from "@/components/shared/LogoMark";

const FEATURES = [
  {
    title: "Track shipments in real-time with AI assistance",
    body:  "Connects to FedEx, UPS, DHL, USPS and 50+ carriers. Responds with live location, ETA, and status in under 1 second.",
    tag:   "Core feature",
  },
  {
    title: "Reduce customer support tickets by 40%",
    body:  "RouteMind handles every tracking, delay, and rescheduling inquiry automatically — before they become a ticket.",
    tag:   "Proven result",
  },
  {
    title: "Automate delivery inquiries instantly",
    body:  "Customers get answers the moment they ask, across chat, email, and SMS — without waiting for a human agent.",
    tag:   "Omnichannel",
  },
  {
    title: "Smart escalation to human agents",
    body:  "Knows when an issue needs a human. Passes the full conversation context so your team never starts from scratch.",
    tag:   "AI + human",
  },
];

const CHECK = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#00C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Solution() {
  return (
    <section id="solution" className="relative overflow-hidden" style={{ padding:"120px 32px" }}>
      <div className="absolute rounded-full pointer-events-none" style={{ width:500,height:500, background:"radial-gradient(circle,rgba(0,102,255,0.14) 0%,transparent 65%)", top:-100,left:-100,filter:"blur(60px)" }} />

      <div className="max-w-6xl mx-auto grid gap-16 lg:gap-24 items-center" style={{ gridTemplateColumns:"1fr 1fr" }}>
        {/* Left */}
        <div>
          <p className="reveal text-xs font-semibold font-display mb-4" style={{ color:"#00C2FF", letterSpacing:"0.14em", textTransform:"uppercase" }}>
            The solution
          </p>
          <h2 className="reveal font-display font-extrabold text-white mb-5" style={{ fontSize:"clamp(32px,4.5vw,54px)", letterSpacing:"-0.03em", lineHeight:1.08, maxWidth:520 }}>
            One AI Agent. All Your Logistics Support.
          </h2>
          <p className="reveal text-base leading-relaxed mb-8" style={{ color:"rgba(255,255,255,0.48)", maxWidth:460, fontWeight:300 }}>
            RouteMind plugs into your existing carrier APIs and support stack in under 2 hours.
            No engineering, no training data required. Just instant, accurate answers — every time.
          </p>

          <div className="reveal flex flex-col gap-1.5 mb-10">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 px-4 py-4 rounded-xl transition-all duration-200 cursor-default group"
                style={{ border:"0.5px solid transparent" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background="rgba(0,194,255,0.05)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(0,194,255,0.12)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background=""; (e.currentTarget as HTMLElement).style.borderColor="transparent"; }}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                     style={{ background:"rgba(0,194,255,0.12)", border:"0.5px solid rgba(0,194,255,0.25)" }}>
                  {CHECK}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-display font-bold" style={{ fontSize:15, color:"#fff" }}>{f.title}</h4>
                    <span className="text-xs font-semibold font-display px-2 py-0.5 rounded-full hidden sm:inline-block"
                          style={{ background:"rgba(0,194,255,0.08)", color:"rgba(0,194,255,0.7)", letterSpacing:"0.04em", fontSize:9 }}>
                      {f.tag}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color:"rgba(255,255,255,0.5)" }}>{f.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal flex gap-3">
            <Link
              href="/chat"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-opacity duration-150 hover:opacity-85"
              style={{ background:"#00C2FF", color:"#080C18", textDecoration:"none" }}
            >
              Start automating inquiries →
            </Link>
            <Link
              href="/track"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm transition-all duration-150"
              style={{ background:"transparent", color:"rgba(255,255,255,0.5)", border:"0.5px solid rgba(255,255,255,0.1)", textDecoration:"none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color="#fff"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.5)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.1)"; }}
            >
              Try live tracking
            </Link>
          </div>
        </div>

        {/* Right — AI chat card */}
        <div className="reveal relative">
          {/* Float top-right */}
          <div className="absolute z-10 p-4 rounded-xl hidden lg:block"
               style={{ top:-20, right:-36, background:"#131929", border:"0.5px solid rgba(255,255,255,0.07)", minWidth:180 }}>
            <div className="font-display font-extrabold" style={{ fontSize:28, color:"#00C2FF", letterSpacing:"-0.02em" }}>40%</div>
            <div className="text-xs mt-0.5" style={{ color:"rgba(255,255,255,0.48)" }}>fewer support tickets</div>
            <div className="text-xs font-semibold mt-1.5 font-display" style={{ color:"#3CDC78" }}>↑ avg across all customers</div>
          </div>

          {/* Chat card */}
          <div className="relative overflow-hidden rounded-2xl" style={{ background:"#131929", border:"0.5px solid rgba(255,255,255,0.07)" }}>
            <div className="absolute pointer-events-none" style={{ width:300,height:300, background:"radial-gradient(circle,rgba(0,102,255,0.18) 0%,transparent 65%)", top:-60,right:-60,filter:"blur(40px)" }} />

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom:"0.5px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-3">
                <LogoMark size={30} />
                <div>
                  <div className="font-display font-bold text-sm text-white">RouteMind AI</div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color:"#00C2FF" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse2" style={{ background:"#00C2FF" }} />
                    Tracking 120 active shipments
                  </div>
                </div>
              </div>
              <div className="flex gap-0">
                {[{val:"0.8s",lbl:"Response"},{val:"40%",lbl:"Ticket drop"}].map((m,i) => (
                  <div key={m.lbl} className="text-center px-3.5 py-2" style={{ borderLeft: i>0 ? "0.5px solid rgba(255,255,255,0.07)":"none" }}>
                    <div className="font-display font-bold text-sm" style={{ color:"#00C2FF" }}>{m.val}</div>
                    <div className="text-xs" style={{ color:"rgba(255,255,255,0.35)" }}>{m.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-3 p-5">
              <div className="flex justify-end gap-2.5">
                <div className="px-3.5 py-2.5 rounded-2xl rounded-br-sm text-xs leading-relaxed max-w-xs"
                     style={{ background:"rgba(0,194,255,0.1)", border:"0.5px solid rgba(0,194,255,0.18)", color:"rgba(255,255,255,0.85)" }}>
                  RM-003 is delayed. Where is it and when will it arrive?
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:"linear-gradient(135deg,#00C2FF,#0066FF)" }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 6L4.5 9L10.5 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm text-xs leading-relaxed"
                       style={{ background:"rgba(255,255,255,0.04)", border:"0.5px solid rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.7)", maxWidth:280 }}>
                    Your shipment <strong style={{ color:"#fff" }}>RM-003</strong> is delayed due to weather and currently in <strong style={{ color:"#fff" }}>Atlanta, GA</strong>.
                    New ETA: <strong style={{ color:"#fff" }}>Jan 17, 2025</strong>. I&apos;ve credited <strong style={{ color:"#3CDC78" }}>$5</strong> to your account.
                  </div>
                  <div className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold font-display"
                       style={{ background:"rgba(60,220,120,0.1)", border:"0.5px solid rgba(60,220,120,0.2)", color:"#3CDC78", letterSpacing:"0.06em", textTransform:"uppercase", fontSize:9 }}>
                    <span className="w-1 h-1 rounded-full" style={{ background:"#3CDC78" }} />
                    Resolved · Credit applied
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Float bottom-left */}
          <div className="absolute z-10 p-4 rounded-xl hidden lg:block"
               style={{ bottom:50, left:-36, background:"#131929", border:"0.5px solid rgba(255,255,255,0.07)", minWidth:164 }}>
            <div className="font-display font-extrabold" style={{ fontSize:28, color:"#3CDC78", letterSpacing:"-0.02em" }}>300</div>
            <div className="text-xs mt-0.5" style={{ color:"rgba(255,255,255,0.48)" }}>chats handled today</div>
            <div className="text-xs font-semibold mt-1.5 font-display" style={{ color:"#3CDC78" }}>↑ 100% automated</div>
          </div>
        </div>
      </div>
    </section>
  );
}
