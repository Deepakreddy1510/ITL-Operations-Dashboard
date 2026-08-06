import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export type SessionUser = { id: number; email: string; name: string; isAdmin: boolean };

const secret = () => new TextEncoder().encode(process.env.AUTH_SECRET || "dev-secret-change-me");

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get("manager_session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      id: Number(payload.sub),
      email: String(payload.email),
      name: String(payload.name),
      isAdmin: Boolean(payload.isAdmin),
    };
  } catch {
    return null;
  }
}
