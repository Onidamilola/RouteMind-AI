"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import type { Shipment, ShipmentStatus } from "@/types";
import LogoMark from "@/components/shared/LogoMark";

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ShipmentStatus, { label: string; color: string; bg: string; border: string; icon: string }> = {
  in_transit: {
    label:  "In Transit",
    color:  "#00C2FF",
    bg:     "rgba(0,194,255,0.08)",
    border: "rgba(0,194,255,0.2)",
    icon:   "🚚",
  },
  delivered: {
    label:  "Delivered",
    color:  "#3CDC78",
    bg:     "rgba(60,220,120,0.08)",
    border: "rgba(60,220,120,0.2)",
    icon:   "✅",
  },
  delayed: {
    label:  "Delayed",
    color:  "#FFA03C",
    bg:     "rgba(255,160,60,0.08)",
    border: "rgba(255,160,60,0.2)",
    icon:   "⚠️",
  },
};

// ─── Progress steps ───────────────────────────────────────────────────────────

function TrackingSteps({ status }: { status: ShipmentStatus }) {
  const steps = ["Order Placed", "Picked Up", "In Transit", "Out for Delivery", "Delivered"];
  const activeIndex = status === "delivered" ? 4 : status === "in_transit" ? 2 : 2;

  return (
    <div className="flex items-center gap-0 w-full mt-6">
      {steps.map((step, i) => {
        const done    = i < activeIndex;
        const active  = i === activeIndex;
        const delayed = status === "delayed" && active;

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            {/* Node */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: done   ? "#00C2FF"
                             : active && delayed ? "#FFA03C"
                             : active ? "#00C2FF"
                             : "rgba(255,255,255,0.06)",
                  border: done || active
                    ? "none"
                    : "0.5px solid rgba(255,255,255,0.12)",
                  color: done || active ? "#080C18" : "rgba(255,255,255,0.25)",
                  boxShadow: active ? `0 0 16px ${delayed ? "rgba(255,160,60,0.4)" : "rgba(0,194,255,0.4)"}` : "none",
                }}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className="text-xs text-center leading-tight"
                style={{
                  color:    active ? (delayed ? "#FFA03C" : "#00C2FF") : done ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)",
                  fontWeight: active ? 500 : 400,
                  minWidth:   60,
                  maxWidth:   72,
                }}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className="flex-1 h-px mx-1 mb-5"
                style={{
                  background: i < activeIndex
                    ? "#00C2FF"
                    : "rgba(255,255,255,0.08)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Detail row ───────────────────────────────────────────────────────────────

function DetailRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between items-start gap-4 py-3" style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
      <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</span>
      <span className="text-sm font-medium text-right" style={{ color: accent ? "#00C2FF" : "rgba(255,255,255,0.85)" }}>{value}</span>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TrackPage() {
  const [input,     setInput]     = useState("");
  const [shipment,  setShipment]  = useState<Shipment | null>(null);
  const [loading,   setLoading]   = useState(false);
  const [notFound,  setNotFound]  = useState(false);
  const [searched,  setSearched]  = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const id = input.trim();
    if (!id) return;

    setLoading(true);
    setNotFound(false);
    setShipment(null);
    setSearched(true);

    try {
      const res = await fetch(`/api/shipments?id=${encodeURIComponent(id)}`);
      if (res.status === 404) {
        setNotFound(true);
      } else if (res.ok) {
        const data: Shipment = await res.json();
        setShipment(data);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const cfg = shipment ? STATUS_CONFIG[shipment.status] : null;

  return (
    <div className="min-h-screen" style={{ background: "#080C18", fontFamily: "var(--font-dm)" }}>
      <div className="grid-bg fixed inset-0 pointer-events-none" />

      {/* Glow */}
      <div
        className="fixed rounded-full pointer-events-none"
        style={{
          width: 700, height: 400,
          background: "radial-gradient(ellipse, rgba(0,102,255,0.14) 0%, transparent 65%)",
          top: 0, left: "50%", transform: "translateX(-50%)",
          filter: "blur(80px)",
        }}
      />

      {/* Nav */}
      <nav
        className="flex items-center justify-between px-6 md:px-12 relative z-10"
        style={{ height: 68, borderBottom: "0.5px solid rgba(255,255,255,0.07)", background: "rgba(8,12,24,0.8)", backdropFilter: "blur(20px)" }}
      >
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <LogoMark size={32} />
          <span className="font-display font-bold text-sm" style={{ color: "#fff", letterSpacing: "-0.01em" }}>
            Route<span style={{ color: "#00C2FF" }}>Mind</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/chat"
            className="text-xs px-4 py-2 rounded-lg transition-all duration-150"
            style={{ color: "rgba(255,255,255,0.5)", border: "0.5px solid rgba(255,255,255,0.09)" }}
          >
            AI Chat Support
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold font-display mb-5"
            style={{ background: "rgba(0,194,255,0.08)", border: "0.5px solid rgba(0,194,255,0.2)", color: "#00C2FF", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse2" style={{ background: "#00C2FF" }} />
            Real-time tracking
          </div>
          <h1
            className="font-display font-extrabold text-white mb-3"
            style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Track Your Shipment
          </h1>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
            Enter your RouteMind tracking ID for live status updates
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-10">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            placeholder="e.g. RM-042"
            className="flex-1 px-5 py-4 rounded-xl text-sm transition-all duration-200"
            style={{
              background:  "#131929",
              border:      "0.5px solid rgba(255,255,255,0.09)",
              color:       "#fff",
              outline:     "none",
              caretColor:  "#00C2FF",
              fontFamily:  "var(--font-dm)",
              letterSpacing: "0.05em",
            }}
            onFocus={(e) => { e.target.style.borderColor = "rgba(0,194,255,0.35)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,194,255,0.06)"; }}
            onBlur={(e)  => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "none"; }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-7 py-4 rounded-xl text-sm font-medium transition-all duration-150 flex-shrink-0"
            style={{
              background: loading || !input.trim() ? "rgba(0,194,255,0.35)" : "#00C2FF",
              color:      "#080C18",
              cursor:     loading || !input.trim() ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 inline-block" style={{ borderColor: "rgba(0,0,0,0.2)", borderTopColor: "#080C18", animation: "spin .7s linear infinite" }} />
                Searching
              </span>
            ) : (
              "Track →"
            )}
          </button>
        </form>

        {/* Quick sample IDs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {["RM-003", "RM-042", "RM-086", "RM-100"].map((id) => (
            <button
              key={id}
              onClick={() => setInput(id)}
              className="text-xs px-3 py-1.5 rounded-lg transition-colors duration-150"
              style={{ background: "#131929", border: "0.5px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#00C2FF"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,194,255,0.2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              Try {id}
            </button>
          ))}
        </div>

        {/* Not found */}
        {notFound && searched && (
          <div
            className="text-center p-8 rounded-2xl"
            style={{ background: "#0F1524", border: "0.5px solid rgba(255,80,80,0.15)" }}
          >
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-display font-bold text-white mb-2">Tracking ID not found</h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              We couldn&apos;t find shipment <strong style={{ color: "#fff" }}>{input}</strong>. Double-check your tracking ID or{" "}
              <Link href="/chat" style={{ color: "#00C2FF" }}>chat with our AI for help</Link>.
            </p>
          </div>
        )}

        {/* Shipment card */}
        {shipment && cfg && (
          <div
            className="rounded-2xl overflow-hidden animate-fadeUp"
            style={{ background: "#0F1524", border: "0.5px solid rgba(255,255,255,0.08)" }}
          >
            {/* Card header */}
            <div
              className="px-6 py-5 flex items-center justify-between"
              style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}
            >
              <div>
                <h2 className="font-display font-bold text-white text-lg">{shipment.tracking_id}</h2>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {shipment.carrier} · {shipment.weight}
                </p>
              </div>
              <div
                className="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold font-display"
                style={{ background: cfg.bg, border: `0.5px solid ${cfg.border}`, color: cfg.color }}
              >
                <span>{cfg.icon}</span>
                {cfg.label}
              </div>
            </div>

            {/* Tracking steps */}
            <div className="px-6 pb-2 pt-4">
              <TrackingSteps status={shipment.status} />
            </div>

            {/* Details */}
            <div className="px-6 py-4">
              <DetailRow label="Current location"    value={shipment.location}           accent />
              <DetailRow label="Route"               value={`${shipment.origin} → ${shipment.destination}`} />
              <DetailRow label="Estimated delivery"  value={shipment.estimated_delivery} />
              {shipment.actual_delivery && (
                <DetailRow label="Delivered on"      value={shipment.actual_delivery}    accent />
              )}
              <DetailRow label="Customer"            value={shipment.customer} />
            </div>

            {/* Footer CTA */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                Last updated: just now
              </p>
              <Link
                href={`/chat`}
                className="flex items-center gap-1.5 text-xs font-medium transition-opacity duration-150 hover:opacity-80"
                style={{ color: "#00C2FF" }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Get AI support for this shipment
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
