import { NextRequest, NextResponse } from "next/server";
import { ADMIN_USERS } from "@/data/auth";

export async function POST(req: NextRequest) {
  let body: { email: string; password: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = ADMIN_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    // Intentionally vague error for security
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  // Return user data without password
  const { password: _pw, ...safeUser } = user;
  void _pw;

  return NextResponse.json({ user: safeUser });
}
