"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser, hydrateAuth, clearAuthError } from "@/store/slices/authSlice";
import LogoMark from "@/components/shared/LogoMark";

export default function LoginPage() {
  const dispatch   = useAppDispatch();
  const router     = useRouter();
  const { user, isLoading, error } = useAppSelector((s) => s.auth);

  const [email,    setEmail]    = useState("admin@routemind.ai");
  const [password, setPassword] = useState("admin123");

  // Hydrate and redirect if already logged in
  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    if (user) router.replace("/admin");
  }, [user, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(clearAuthError());
    dispatch(loginUser({ email, password }));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#080C18" }}
    >
      {/* Grid bg */}
      <div className="grid-bg fixed inset-0 pointer-events-none" />

      {/* Glow */}
      <div
        className="fixed rounded-full pointer-events-none"
        style={{
          width: 600, height: 400,
          background: "radial-gradient(ellipse, rgba(0,102,255,0.15) 0%, transparent 65%)",
          top: "30%", left: "50%", transform: "translate(-50%,-50%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div
          className="px-8 py-10 rounded-2xl"
          style={{
            background: "#0F1524",
            border:     "0.5px solid rgba(255,255,255,0.09)",
          }}
        >
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <LogoMark size={48} />
            <h1
              className="font-display font-bold mt-4 text-xl text-white"
              style={{ letterSpacing: "-0.02em" }}
            >
              Route<span style={{ color: "#00C2FF" }}>Mind</span> Admin
            </h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              Sign in to your dashboard
            </p>
          </div>

          {/* Demo credentials hint */}
          <div
            className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl mb-6 text-xs leading-relaxed"
            style={{
              background: "rgba(0,194,255,0.06)",
              border:     "0.5px solid rgba(0,194,255,0.15)",
              color:      "rgba(255,255,255,0.5)",
            }}
          >
            <svg className="flex-shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#00C2FF" strokeWidth="1.2"/>
              <path d="M7 6v4M7 4.5v.5" stroke="#00C2FF" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <span>
              <span style={{ color: "#00C2FF" }}>Demo credentials:</span>{" "}
              admin@routemind.ai / admin123
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@routemind.ai"
                className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200"
                style={{
                  background:  "#131929",
                  border:      "0.5px solid rgba(255,255,255,0.09)",
                  color:       "#fff",
                  outline:     "none",
                  caretColor:  "#00C2FF",
                  fontFamily:  "var(--font-dm)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(0,194,255,0.4)";
                  e.target.style.boxShadow   = "0 0 0 3px rgba(0,194,255,0.06)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.09)";
                  e.target.style.boxShadow   = "none";
                }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200"
                style={{
                  background:  "#131929",
                  border:      "0.5px solid rgba(255,255,255,0.09)",
                  color:       "#fff",
                  outline:     "none",
                  caretColor:  "#00C2FF",
                  fontFamily:  "var(--font-dm)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(0,194,255,0.4)";
                  e.target.style.boxShadow   = "0 0 0 3px rgba(0,194,255,0.06)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.09)";
                  e.target.style.boxShadow   = "none";
                }}
              />
            </div>

            {/* Error */}
            {error && (
              <p
                className="text-xs px-3.5 py-2.5 rounded-xl"
                style={{
                  background: "rgba(255,80,80,0.08)",
                  border:     "0.5px solid rgba(255,80,80,0.2)",
                  color:      "rgba(255,120,120,0.9)",
                }}
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-150 mt-1"
              style={{
                background: isLoading ? "rgba(0,194,255,0.4)" : "#00C2FF",
                color:      "#080C18",
                cursor:     isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="inline-block w-4 h-4 rounded-full border-2"
                    style={{ borderColor: "rgba(0,0,0,0.3)", borderTopColor: "#080C18", animation: "spin .7s linear infinite" }}
                  />
                  Signing in…
                </span>
              ) : (
                "Sign in to dashboard"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-5" style={{ color: "rgba(255,255,255,0.2)" }}>
          © 2025 RouteMind AI · Secure Admin Portal
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
