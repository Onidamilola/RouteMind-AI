"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import AuthGuard from "@/components/auth/AuthGuard";
import { SHIPMENTS, STATS } from "@/data/shipments";
import { CHAT_LOGS } from "@/data/chatLogs";
import type { ShipmentStatus } from "@/types";
import LogoMark from "@/components/shared/LogoMark";

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  label, value, sub, color, icon,
}: {
  label: string; value: string | number; sub?: string; color: string; icon: React.ReactNode;
}) {
  return (
    <div
      className="p-6 rounded-2xl flex flex-col gap-3"
      style={{ background: "#0F1524", border: "0.5px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15`, border: `0.5px solid ${color}30` }}
        >
          {icon}
        </div>
        {sub && (
          <span className="text-xs font-semibold font-display" style={{ color: "#3CDC78" }}>
            {sub}
          </span>
        )}
      </div>
      <div>
        <div
          className="font-display font-extrabold"
          style={{ fontSize: 32, letterSpacing: "-0.03em", color }}
        >
          {value}
        </div>
        <div className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</div>
      </div>
    </div>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<ShipmentStatus, { color: string; bg: string; label: string }> = {
  in_transit: { color: "#00C2FF", bg: "rgba(0,194,255,0.1)",    label: "In Transit" },
  delivered:  { color: "#3CDC78", bg: "rgba(60,220,120,0.1)",   label: "Delivered"  },
  delayed:    { color: "#FFA03C", bg: "rgba(255,160,60,0.1)",   label: "Delayed"    },
};

function StatusBadge({ status }: { status: ShipmentStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className="text-xs font-semibold font-display px-2.5 py-1 rounded-full"
      style={{ background: s.bg, color: s.color, letterSpacing: "0.04em" }}
    >
      {s.label}
    </span>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({ title, count, action }: { title: string; count?: number; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <h2 className="font-display font-bold text-white" style={{ fontSize: 16 }}>{title}</h2>
        {count !== undefined && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(0,194,255,0.1)", color: "#00C2FF" }}
          >
            {count}
          </span>
        )}
      </div>
      {action}
    </div>
  );
}

// ─── Dashboard content ────────────────────────────────────────────────────────

function DashboardContent() {
  const dispatch   = useAppDispatch();
  const user       = useAppSelector((s) => s.auth.user);
  const [tab, setTab] = useState<"all" | ShipmentStatus>("all");
  const [search, setSearch] = useState("");

  const filteredShipments = SHIPMENTS
    .filter((s) => tab === "all" || s.status === tab)
    .filter((s) =>
      !search ||
      s.tracking_id.toLowerCase().includes(search.toLowerCase()) ||
      s.customer.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase())
    );

  const avgResponseMs = Math.round(
    CHAT_LOGS.reduce((a, l) => a + l.response_time_ms, 0) / CHAT_LOGS.length
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: "#080C18", fontFamily: "var(--font-dm)" }}
    >
      <div className="grid-bg fixed inset-0 pointer-events-none" />

      {/* Top nav */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-8"
        style={{
          height: 64,
          background:     "rgba(8,12,24,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom:   "0.5px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center gap-3">
          <LogoMark size={32} />
          <div>
            <span className="font-display font-bold text-sm" style={{ color: "#fff" }}>
              Route<span style={{ color: "#00C2FF" }}>Mind</span>
            </span>
            <span
              className="ml-2 text-xs font-semibold font-display px-2 py-0.5 rounded"
              style={{ background: "rgba(0,194,255,0.1)", color: "#00C2FF", letterSpacing: "0.05em" }}
            >
              ADMIN
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/track"
            className="text-xs transition-colors duration-150 hidden sm:block"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
          >
            Tracking
          </Link>
          <Link href="/chat"
            className="text-xs transition-colors duration-150 hidden sm:block"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
          >
            AI Chat
          </Link>

          {/* User badge */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #00C2FF, #0066FF)", color: "#080C18" }}
            >
              {user?.avatar}
            </div>
            <span className="text-xs font-medium hidden sm:block" style={{ color: "rgba(255,255,255,0.6)" }}>
              {user?.name}
            </span>
          </div>

          <button
            onClick={() => dispatch(logout())}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all duration-150"
            style={{ color: "rgba(255,255,255,0.35)", border: "0.5px solid rgba(255,255,255,0.07)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,80,80,0.8)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,80,80,0.2)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M8 1v10M5 9l-3-3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sign out
          </button>
        </div>
      </header>

      <main className="relative z-10 px-6 md:px-8 py-8 max-w-screen-xl mx-auto">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display font-extrabold text-white mb-1" style={{ fontSize: "clamp(22px,3vw,30px)", letterSpacing: "-0.025em" }}>
            Good morning, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Here&apos;s what&apos;s happening across your logistics network today.
          </p>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Shipments" value={STATS.total} sub="↑ 12% this week"
            color="#00C2FF"
            icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="5" width="14" height="10" rx="2" stroke="#00C2FF" strokeWidth="1.3"/><path d="M6 5V4a3 3 0 016 0v1" stroke="#00C2FF" strokeWidth="1.3" strokeLinecap="round"/></svg>}
          />
          <StatCard
            label="In Transit" value={STATS.in_transit} sub="on schedule"
            color="#00C2FF"
            icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9h10M8 6l4 3-4 3" stroke="#00C2FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="14" cy="9" r="2.5" stroke="#00C2FF" strokeWidth="1.3"/></svg>}
          />
          <StatCard
            label="Delivered" value={STATS.delivered} sub="↑ 8% vs last week"
            color="#3CDC78"
            icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="#3CDC78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          />
          <StatCard
            label="Delayed" value={STATS.delayed} sub="needs attention"
            color="#FFA03C"
            icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#FFA03C" strokeWidth="1.3"/><path d="M9 5v4.5M9 12.5v.5" stroke="#FFA03C" strokeWidth="1.4" strokeLinecap="round"/></svg>}
          />
        </div>

        {/* ── Secondary stats ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="AI Chats Handled" value="300" sub="↓ 40% ticket volume"
            color="#00C2FF"
            icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 4h12a1 1 0 011 1v7a1 1 0 01-1 1H6l-3 3V5a1 1 0 011-1z" stroke="#00C2FF" strokeWidth="1.3" strokeLinejoin="round"/></svg>}
          />
          <StatCard
            label="Avg AI Response Time" value={`${avgResponseMs}ms`} sub="vs 4.2hr human avg"
            color="#3CDC78"
            icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#3CDC78" strokeWidth="1.3"/><path d="M9 5v4l3 2" stroke="#3CDC78" strokeWidth="1.3" strokeLinecap="round"/></svg>}
          />
          <StatCard
            label="Customer Satisfaction" value="4.8 / 5.0" sub="↑ from 3.2 last quarter"
            color="#FFA03C"
            icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l2 5h5l-4 3 1.5 5L9 12l-4.5 3L6 10 2 7h5z" stroke="#FFA03C" strokeWidth="1.2" strokeLinejoin="round"/></svg>}
          />
        </div>

        {/* ── Shipments table ── */}
        <div
          className="rounded-2xl overflow-hidden mb-8"
          style={{ background: "#0F1524", border: "0.5px solid rgba(255,255,255,0.07)" }}
        >
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
            <SectionHeader title="Shipments" count={filteredShipments.length} />

            <div className="flex items-center gap-3">
              {/* Search */}
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search shipments…"
                className="px-3.5 py-2 rounded-xl text-xs transition-all duration-200"
                style={{
                  background:  "#131929",
                  border:      "0.5px solid rgba(255,255,255,0.08)",
                  color:       "#fff",
                  outline:     "none",
                  width:       180,
                  fontFamily:  "var(--font-dm)",
                }}
                onFocus={(e) => { e.target.style.borderColor = "rgba(0,194,255,0.3)"; }}
                onBlur={(e)  => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
              />

              {/* Tab filter */}
              <div className="flex rounded-xl overflow-hidden" style={{ border: "0.5px solid rgba(255,255,255,0.08)" }}>
                {(["all", "in_transit", "delivered", "delayed"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="px-3 py-2 text-xs transition-colors duration-150"
                    style={{
                      background: tab === t ? "rgba(0,194,255,0.12)" : "#131929",
                      color:      tab === t ? "#00C2FF" : "rgba(255,255,255,0.4)",
                      fontWeight: tab === t ? 600 : 400,
                    }}
                  >
                    {t === "all" ? "All" : t === "in_transit" ? "Transit" : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
                  {["Tracking ID", "Customer", "Origin → Destination", "Location", "ETA", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold font-display"
                        style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredShipments.slice(0, 20).map((s, i) => (
                  <tr
                    key={s.tracking_id}
                    style={{
                      borderBottom: "0.5px solid rgba(255,255,255,0.04)",
                      background:   i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,194,255,0.03)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)")}
                  >
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/track?id=${s.tracking_id}`}
                        className="font-display font-bold text-xs hover:opacity-80 transition-opacity"
                        style={{ color: "#00C2FF" }}
                      >
                        {s.tracking_id}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>{s.customer}</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{s.email}</div>
                    </td>
                    <td className="px-5 py-3.5 text-xs" style={{ color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                      {s.origin}<br /><span style={{ color: "rgba(255,255,255,0.3)" }}>→ {s.destination}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{s.location}</td>
                    <td className="px-5 py-3.5 text-xs" style={{ color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>{s.estimated_delivery}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredShipments.length > 20 && (
            <div className="px-6 py-3 text-center" style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                Showing 20 of {filteredShipments.length} shipments
              </span>
            </div>
          )}
        </div>

        {/* ── Chat logs ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#0F1524", border: "0.5px solid rgba(255,255,255,0.07)" }}
        >
          <div className="px-6 py-5" style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
            <SectionHeader title="Recent AI Chat Logs" count={CHAT_LOGS.length} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
                  {["Session", "User", "Message", "Topic", "Response", "Resolved"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold font-display"
                        style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CHAT_LOGS.slice(0, 15).map((log, i) => (
                  <tr
                    key={log.id}
                    style={{
                      borderBottom: "0.5px solid rgba(255,255,255,0.04)",
                      background:   i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,194,255,0.03)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)")}
                  >
                    <td className="px-5 py-3.5 text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>{log.session_id}</td>
                    <td className="px-5 py-3.5 text-sm" style={{ color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap" }}>{log.user}</td>
                    <td className="px-5 py-3.5 text-xs" style={{ color: "rgba(255,255,255,0.55)", maxWidth: 280 }}>
                      <span className="block truncate" style={{ maxWidth: 260 }}>{log.message}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="text-xs font-semibold font-display px-2 py-0.5 rounded-full"
                        style={{
                          background: log.topic === "delay"   ? "rgba(255,160,60,0.1)"
                                    : log.topic === "missing" ? "rgba(255,80,80,0.1)"
                                    : log.topic === "address" ? "rgba(60,220,120,0.1)"
                                    : "rgba(0,194,255,0.1)",
                          color:      log.topic === "delay"   ? "#FFA03C"
                                    : log.topic === "missing" ? "#FF5050"
                                    : log.topic === "address" ? "#3CDC78"
                                    : "#00C2FF",
                        }}
                      >
                        {log.topic}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs" style={{ color: "#3CDC78", whiteSpace: "nowrap" }}>{log.response_time_ms}ms</td>
                    <td className="px-5 py-3.5">
                      {log.resolved ? (
                        <span className="text-xs font-semibold" style={{ color: "#3CDC78" }}>✓ Yes</span>
                      ) : (
                        <span className="text-xs font-semibold" style={{ color: "#FFA03C" }}>⚠ Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 text-center" style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              Showing 15 of {CHAT_LOGS.length} chat logs · AI resolved {CHAT_LOGS.filter((l) => l.resolved).length} automatically
            </span>
          </div>
        </div>

      </main>
    </div>
  );
}

// ─── Exported page — wrapped in AuthGuard ────────────────────────────────────

export default function AdminPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
