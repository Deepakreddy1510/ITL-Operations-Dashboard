import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET(){
  const s=await getSessionUser(); if(!s?.isAdmin) return NextResponse.json({error:"Forbidden"},{status:403});
  return NextResponse.json(await prisma.user.findMany({select:{id:true,name:true,email:true,isActive:true,isAdmin:true,createdAt:true},orderBy:{name:"asc"}}));
}
export async function POST(req:Request){
  const s=await getSessionUser(); if(!s?.isAdmin) return NextResponse.json({error:"Forbidden"},{status:403});
  const p=z.object({name:z.string().min(2),email:z.string().email(),password:z.string().min(6),isAdmin:z.boolean().default(false),isActive:z.boolean().default(true)}).safeParse(await req.json());
  if(!p.success)return NextResponse.json({error:p.error.issues[0]?.message},{status:400});
  try{const user=await prisma.user.create({data:{...p.data,email:p.data.email.toLowerCase(),passwordHash:await bcrypt.hash(p.data.password,12)},select:{id:true,name:true,email:true,isActive:true,isAdmin:true,createdAt:true}});return NextResponse.json(user,{status:201})}catch{return NextResponse.json({error:"Email already exists"},{status:409})}
}
