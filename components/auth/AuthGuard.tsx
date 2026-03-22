"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrateAuth } from "@/store/slices/authSlice";

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const dispatch = useAppDispatch();
  const user     = useAppSelector((s) => s.auth.user);
  const router   = useRouter();

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    // After hydration check: if still no user, redirect to login
    const timer = setTimeout(() => {
      if (!user) router.replace("/login");
    }, 80); // tiny delay so hydration can run first
    return () => clearTimeout(timer);
  }, [user, router]);

  if (!user) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: "#080C18" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-2 animate-spin-slow"
            style={{ borderColor: "rgba(0,194,255,0.3)", borderTopColor: "#00C2FF" }}
          />
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            Verifying session…
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
