import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      return NextResponse.redirect(
        new URL("/verify-email?error=invalid", req.url)
      );
    }

    // ── Find the token ────────────────────────────────────────
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.redirect(
        new URL("/verify-email?error=invalid", req.url)
      );
    }

    // ── Check expiry ──────────────────────────────────────────
    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { token } });
      return NextResponse.redirect(
        new URL("/verify-email?error=expired", req.url)
      );
    }

    // ── Mark email as verified ────────────────────────────────
    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    // ── Delete the used token ─────────────────────────────────
    await prisma.verificationToken.delete({ where: { token } });

    return NextResponse.redirect(
      new URL("/verify-email?success=true", req.url)
    );
  } catch (err) {
    console.error("[VERIFY_EMAIL_ERROR]", err);
    return NextResponse.redirect(
      new URL("/verify-email?error=server", req.url)
    );
  }
}