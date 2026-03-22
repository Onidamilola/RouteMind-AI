import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/shared/ReduxProvider";

const syne = Syne({
  subsets:  ["latin"],
  weight:   ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display:  "swap",
});

const dmSans = DM_Sans({
  subsets:  ["latin"],
  weight:   ["300", "400", "500"],
  variable: "--font-dm",
  display:  "swap",
});

export const metadata: Metadata = {
  title:       "RouteMind AI — One AI Agent. All Your Logistics Support.",
  description: "RouteMind AI instantly responds to delivery inquiries, provides real-time tracking updates, and reduces customer support workload.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <div className="noise-overlay" />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
