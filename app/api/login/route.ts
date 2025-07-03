import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  // Hardcoded credentials for demo
  if (username === "admin" && password === "password") {
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  }
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
} 