import {NextResponse} from "next/server"; export async function POST(req:Request){const r=NextResponse.redirect(new URL("/login",req.url));r.cookies.delete("manager_session");return r}
