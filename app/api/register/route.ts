import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { fullName, email, password, role } = await req.json();
  if (!fullName || !email || !password || !role) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }
  // Check for existing user
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }
  // Hash password
  const hashed = await bcrypt.hash(password, 10);
  // Create user
  await prisma.user.create({
    data: { fullName, email, password: hashed, role },
  });
  return NextResponse.json({ message: "Registration successful" });
} 