import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
const openPaths=["/login","/api/auth/login"];
export async function middleware(req:NextRequest){
  if(openPaths.some(p=>req.nextUrl.pathname.startsWith(p))) return NextResponse.next();
  const token=req.cookies.get("manager_session")?.value;
  if(!token) return NextResponse.redirect(new URL("/login",req.url));
  try{ await jwtVerify(token,new TextEncoder().encode(process.env.AUTH_SECRET||"dev-secret-change-me")); return NextResponse.next(); }
  catch{ const res=NextResponse.redirect(new URL("/login",req.url)); res.cookies.delete("manager_session"); return res; }
}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico).*)"]};
