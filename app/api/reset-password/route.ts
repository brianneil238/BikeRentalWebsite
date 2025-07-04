import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();
  if (!token || !password) {
    return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
  }
  // Find user by token
  const user = await prisma.user.findFirst({ where: { passwordResetToken: token } });
  if (!user || !user.passwordResetExpiry || user.passwordResetExpiry < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }
  // Hash new password
  const hashed = await bcrypt.hash(password, 10);
  // Update user password and clear token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      passwordResetToken: null,
      passwordResetExpiry: null,
    },
  });
  return NextResponse.json({ message: "Password has been reset. You can now log in." });
} 