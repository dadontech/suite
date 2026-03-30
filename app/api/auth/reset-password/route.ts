import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  token:    z.string().min(1),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    const { token, password } = schema.parse(await req.json());

    const resetToken = await prisma.passwordResetToken.findUnique({
      where:   { token },
      include: { user: true },
    });

    if (!resetToken || resetToken.used || resetToken.expires < new Date()) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired." },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);

    // Atomic transaction — both succeed or both fail
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data:  { password: hashed },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data:  { used: true },
      }),
    ]);

    return NextResponse.json({ message: "Password reset successfully." });
  } catch (err) {
    console.error("[RESET_PASSWORD_ERROR]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}