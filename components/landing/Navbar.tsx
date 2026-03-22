"use client";

import Link from "next/link";
import LogoMark from "@/components/shared/LogoMark";

const NAV_LINKS = [
  { label: "Product",     href: "#solution"    },
  { label: "How it works",href: "#how-it-works" },
  { label: "Customers",   href: "#customers"    },
  { label: "Track",       href: "/track"        },
];

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-14"
      style={{
        height:         68,
        background:     "rgba(8,12,24,0.78)",
        backdropFilter: "blur(24px)",
        borderBottom:   "0.5px solid rgba(255,255,255,0.07)",
      }}
    >
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <LogoMark size={34} />
        <span className="text-base font-bold font-display" style={{ color: "#fff", letterSpacing: "-0.01em" }}>
          Route<span style={{ color: "#00C2FF" }}>Mind</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-sm transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.48)", textDecoration: "none" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.48)")}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm transition-colors duration-200 hidden sm:block"
          style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
        >
          Admin →
        </Link>
        <Link
          href="/chat"
          className="flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-lg transition-opacity duration-200 hover:opacity-85"
          style={{ background: "#00C2FF", color: "#080C18", fontFamily: "var(--font-dm)", textDecoration: "none" }}
        >
          Start for free
        </Link>
      </div>
    </nav>
  );
}
