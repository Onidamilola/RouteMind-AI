"use client";

import Link from "next/link";
import { STATS } from "@/data/shipments";
import { CHAT_LOGS } from "@/data/chatLogs";

const HERO_STATS = [
  { num: "40%",  label: "Reduction in support tickets"     },
  { num: "< 1s", label: "AI response time"                 },
  { num: `${STATS.total}`,  label: "Active shipments tracked"      },
  { num: `${CHAT_LOGS.length}+`, label: "Inquiries automated today" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ padding: "140px 24px 100px" }}
    >
      <div className="grid-bg" />

      {/* Glows */}
      <div className="absolute rounded-full pointer-events-none" style={{ width:700,height:700, background:"radial-gradient(circle,rgba(0,102,255,0.18) 0%,transparent 65%)", top:-200,left:"50%",transform:"translateX(-50%)",filter:"blur(60px)" }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width:350,height:350, background:"radial-gradient(circle,rgba(0,194,255,0.1) 0%,transparent 65%)", bottom:80,right:"8%",filter:"blur(60px)" }} />

      {/* Social proof badge */}
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold font-display mb-8 animate-fadeUp"
        style={{ background:"rgba(0,194,255,0.08)", border:"0.5px solid rgba(0,194,255,0.22)", color:"#00C2FF", letterSpacing:"0.1em", textTransform:"uppercase" }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse2" style={{ background:"#00C2FF" }} />
        Trusted by 500+ logistics teams worldwide
      </div>

      {/* Headline */}
      <h1
        className="font-display font-extrabold text-white mb-6 animate-fadeUp"
        style={{ fontSize:"clamp(44px,7vw,88px)", lineHeight:1.05, letterSpacing:"-0.035em", maxWidth:920, animationDelay:".1s" }}
      >
        Automate delivery inquiries.
        <br />
        <span style={{ color:"#00C2FF" }}>Instantly.</span>
      </h1>

      {/* Sub */}
      <p
        className="text-lg leading-relaxed mb-5 animate-fadeUp"
        style={{ color:"rgba(255,255,255,0.52)", maxWidth:560, fontWeight:300, animationDelay:".2s" }}
      >
        RouteMind AI answers &ldquo;Where is my package?&rdquo; before your team even sees it.
        Reduce customer support tickets by <strong style={{ color:"#fff", fontWeight:500 }}>40%</strong>,
        automate tracking updates in <strong style={{ color:"#fff", fontWeight:500 }}>real-time</strong>,
        and give customers the instant answers they expect — 24/7.
      </p>

      {/* Value props */}
      <div
        className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mb-10 animate-fadeUp"
        style={{ animationDelay:".25s" }}
      >
        {[
          "✓ Reduce support tickets by 40%",
          "✓ Automate delivery inquiries instantly",
          "✓ Track shipments in real-time with AI",
        ].map((p) => (
          <span key={p} style={{ color:"rgba(255,255,255,0.55)" }}>{p}</span>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex gap-3 justify-center items-center mb-16 animate-fadeUp" style={{ animationDelay:".3s" }}>
        <Link
          href="/chat"
          className="px-8 py-3.5 rounded-xl text-sm font-medium transition-all duration-150 hover:opacity-85 hover:-translate-y-px"
          style={{ background:"#00C2FF", color:"#080C18", textDecoration:"none" }}
        >
          Try AI for free — no card needed
        </Link>
        <Link
          href="/track"
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm transition-all duration-200"
          style={{ background:"transparent", color:"rgba(255,255,255,0.55)", border:"0.5px solid rgba(255,255,255,0.13)", textDecoration:"none" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color="#fff"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.25)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.55)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.13)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="4" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M5 4V3a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Track a shipment →
        </Link>
      </div>

      {/* Live stats bar */}
      <div
        className="w-full flex overflow-hidden animate-fadeUp"
        style={{ maxWidth:680, border:"0.5px solid rgba(255,255,255,0.07)", borderRadius:16, background:"#131929", animationDelay:".4s" }}
      >
        {HERO_STATS.map((s, i) => (
          <div
            key={s.label}
            className="flex-1 text-center"
            style={{ padding:"20px 8px", borderRight: i < HERO_STATS.length - 1 ? "0.5px solid rgba(255,255,255,0.07)" : "none" }}
          >
            <div className="font-display font-extrabold" style={{ fontSize:28, letterSpacing:"-0.03em", color:"#00C2FF" }}>
              {s.num}
            </div>
            <div className="text-xs mt-1 leading-tight" style={{ color:"rgba(255,255,255,0.4)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Demo window */}
      <div className="w-full mt-20 animate-fadeUp" style={{ maxWidth:820, animationDelay:".5s" }}>
        <p className="text-xs font-semibold font-display mb-4" style={{ color:"rgba(255,255,255,0.22)", letterSpacing:"0.1em", textTransform:"uppercase" }}>
          Live preview — RouteMind handling a real inquiry
        </p>
        <div className="overflow-hidden" style={{ background:"#131929", border:"0.5px solid rgba(255,255,255,0.07)", borderRadius:18 }}>
          {/* Titlebar */}
          <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom:"0.5px solid rgba(255,255,255,0.07)" }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background:"#FF5F57" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background:"#FFBD2E" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background:"#28C840" }} />
            <span className="text-xs ml-2" style={{ color:"rgba(255,255,255,0.3)" }}>support.yourcompany.com — Powered by RouteMind AI</span>
            <span className="ml-auto flex items-center gap-1.5 text-xs" style={{ color:"#3CDC78" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse2" style={{ background:"#3CDC78" }} />
              120 shipments tracked live
            </span>
          </div>
          {/* Body */}
          <div className="grid" style={{ gridTemplateColumns:"1fr 1fr", minHeight:260 }}>
            {/* Inbox */}
            <div className="p-5" style={{ borderRight:"0.5px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs font-semibold font-display mb-3.5" style={{ color:"rgba(255,255,255,0.22)", letterSpacing:"0.08em", textTransform:"uppercase" }}>
                Incoming — 15 delayed shipments
              </p>
              {[
                { from:"Sarah M.",  time:"just now", msg:"Where is my package RM-003?",             tag:"Delayed ⚠️",   tc:"#FFA03C", tb:"rgba(255,160,60,0.12)" },
                { from:"James T.",  time:"1m ago",   msg:"RM-042 hasn't arrived — 3 days late",     tag:"Escalated",    tc:"#FF5050", tb:"rgba(255,80,80,0.12)"  },
                { from:"Liu W.",    time:"4m ago",   msg:"Can I reschedule RM-082?",                tag:"Rescheduled ✓",tc:"#3CDC78", tb:"rgba(60,220,120,0.12)" },
                { from:"Priya K.",  time:"7m ago",   msg:"RM-050 tracking update?",                 tag:"Resolved ✓",   tc:"#3CDC78", tb:"rgba(60,220,120,0.12)" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1 px-3 py-2.5 rounded-lg mb-1.5"
                     style={i === 0 ? { background:"rgba(255,160,60,0.06)", border:"0.5px solid rgba(255,160,60,0.18)" } : {}}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold" style={{ color:"#fff" }}>{item.from}</span>
                    <span className="text-xs" style={{ color:"rgba(255,255,255,0.25)" }}>{item.time}</span>
                  </div>
                  <span className="text-xs" style={{ color:"rgba(255,255,255,0.5)" }}>{item.msg}</span>
                  <span className="text-xs font-semibold font-display w-fit px-2 py-0.5 rounded-full"
                        style={{ background:item.tb, color:item.tc, letterSpacing:"0.06em", textTransform:"uppercase", fontSize:9 }}>
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
            {/* AI reply */}
            <div className="p-5 flex flex-col justify-between">
              <p className="text-xs font-semibold font-display mb-3.5" style={{ color:"rgba(255,255,255,0.22)", letterSpacing:"0.08em", textTransform:"uppercase" }}>
                RouteMind AI — responding in 0.8s
              </p>
              <div className="flex-1 p-3.5 rounded-xl text-xs leading-relaxed mb-3.5"
                   style={{ background:"rgba(0,194,255,0.05)", border:"0.5px solid rgba(0,194,255,0.15)", color:"rgba(255,255,255,0.65)" }}>
                Hi Sarah! Your package <strong style={{ color:"#fff" }}>RM-003</strong> is currently <strong style={{ color:"#FFA03C" }}>delayed</strong> due to weather in Atlanta, GA.
                New estimated delivery: <strong style={{ color:"#fff" }}>Jan 17, 2025</strong>.<br /><br />
                I&apos;ve applied a <strong style={{ color:"#3CDC78" }}>$5 credit</strong> to your account for the inconvenience. Would you like to reschedule?
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold font-display" style={{ color:"#00C2FF", letterSpacing:"0.06em", textTransform:"uppercase" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse2" style={{ background:"#00C2FF" }} />
                  RouteMind AI
                </div>
                <span className="text-xs font-semibold" style={{ color:"#3CDC78" }}>300 chats handled today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
