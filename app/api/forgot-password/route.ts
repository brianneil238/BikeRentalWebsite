import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Always return success for security
    return NextResponse.json({ message: "If this email is registered, a reset link has been sent." });
  }

  // Generate secure token
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now

  // Store token and expiry in user record
  await prisma.user.update({
    where: { email },
    data: { passwordResetToken: token, passwordResetExpiry: expiry },
  });

  // Generate reset link
  const resetLink = `https://your-domain.com/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `<p>You requested a password reset for your BSU Bike Rental account.</p>
           <p>Click <a href='${resetLink}'>here</a> to reset your password. This link will expire in 1 hour.</p>
           <p>If you did not request this, please ignore this email.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "If this email is registered, a reset link has been sent." });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
} 