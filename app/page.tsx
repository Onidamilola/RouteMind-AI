"use client";

import { useEffect } from "react";
import Navbar        from "@/components/landing/Navbar";
import Hero          from "@/components/landing/Hero";
import Problem       from "@/components/landing/Problem";
import Solution      from "@/components/landing/Solution";
import HowItWorks    from "@/components/landing/HowItWorks";
import Testimonials  from "@/components/landing/Testimonials";
import { CTA, Footer } from "@/components/landing/CTAFooter";

export default function LandingPage() {
  // Scroll-reveal observer
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
