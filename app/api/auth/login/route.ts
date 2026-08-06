import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const data = z.object({ email: z.string().email(), password: z.string().min(1) }).safeParse(await req.json());
  if (!data.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email: data.data.email.toLowerCase() } });
  if (!user || !user.isActive || !(await bcrypt.compare(data.data.password, user.passwordHash))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = await new SignJWT({ email: user.email, name: user.name, isAdmin: user.isAdmin })
    .setProtectedHeader({ alg: "HS256" }).setSubject(String(user.id)).setIssuedAt().setExpirationTime("7d")
    .sign(new TextEncoder().encode(process.env.AUTH_SECRET || "dev-secret-change-me"));
  const res = NextResponse.json({ ok: true, user: { name: user.name, email: user.email } });
  res.cookies.set("manager_session", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 604800 });
  return res;
}
