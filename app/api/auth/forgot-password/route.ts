import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = z
      .object({ email: z.string().email() })
      .parse(await req.json());

    const SAFE_RESPONSE = NextResponse.json({
      message: "If that email exists, a reset link was sent.",
    });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return SAFE_RESPONSE; // never reveal if email exists

    // Invalidate all existing tokens for this user
    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, used: false },
      data:  { used: true },
    });

    const token   = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 min

    await prisma.passwordResetToken.create({
      data: { token, userId: user.id, expires },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    await resend.emails.send({
      from:    "Amsuite <noreply@amsuite.io>",
      to:      email,
      subject: "Reset your Amsuite password",
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 16px;color:#6B5E5E">
            <div style="margin-bottom:24px">
              <span style="font-size:20px;font-weight:700;color:#6B5E5E">
                Amsuite<span style="color:#F35D2C">.</span>
              </span>
            </div>
            <h2 style="font-size:22px;font-weight:700;margin-bottom:8px">Reset your password</h2>
            <p style="color:#6B5E5E99;margin-bottom:24px">
              You requested a password reset. Click the button below — this link expires in 30 minutes.
            </p>
            <a href="${resetUrl}"
               style="display:inline-block;background:#F35D2C;color:#fff;font-weight:600;
                      padding:14px 32px;border-radius:12px;text-decoration:none;margin-bottom:24px">
              Reset Password
            </a>
            <p style="font-size:12px;color:#6B5E5E66">
              If you didn't request this, you can safely ignore this email.
            </p>
          </body>
        </html>
      `,
    });

    return SAFE_RESPONSE;
  } catch (err) {
    console.error("[FORGOT_PASSWORD_ERROR]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}