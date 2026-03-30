import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";

// ── Gmail transporter ─────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // ── Validate ──────────────────────────────────────────────
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    // ── Check existing user ───────────────────────────────────
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // ── Hash password & create user ───────────────────────────
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // ── Create verification token (expires in 24h) ────────────
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });

    // ── Send verification email via Resend ────────────────────
    const verifyUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    await transporter.sendMail({
      from: `"Amsuite" <${process.env.GMAIL_USER}>`,
      to: email, // sends to the actual user's email
      subject: "Confirm your Amsuite account",
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: sans-serif; background: #f9f9f9; padding: 40px 0;">
            <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; border: 1px solid #eee;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:32px;">
                <div style="width:32px;height:32px;background:#F35D2C;border-radius:8px;display:flex;align-items:center;justify-content:center;">
                  <span style="color:white;font-weight:bold;font-size:16px;">⚡</span>
                </div>
                <span style="font-size:20px;font-weight:700;color:#6B5E5E;">Amsuite<span style="color:#F35D2C;">.</span></span>
              </div>
              <h1 style="font-size:22px;color:#6B5E5E;margin-bottom:8px;">Confirm your email</h1>
              <p style="color:#9e9090;font-size:14px;line-height:1.6;margin-bottom:32px;">
                Hi ${name}, thanks for signing up! Click the button below to confirm your email address and get started.
              </p>
              <a href="${verifyUrl}"
                style="display:block;background:#F35D2C;color:white;text-decoration:none;text-align:center;padding:14px 24px;border-radius:12px;font-weight:600;font-size:15px;">
                Confirm Email Address
              </a>
              <p style="color:#bbb;font-size:12px;margin-top:24px;text-align:center;">
                This link expires in 24 hours. If you didn't sign up, you can safely ignore this email.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { message: "Account created. Please check your email to confirm." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[SIGNUP_ERROR]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}