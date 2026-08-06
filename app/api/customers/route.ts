import {NextResponse} from "next/server";import {z} from "zod";import {prisma} from "@/lib/prisma";
const schema=z.object({name:z.string().min(2),phone:z.string().optional().nullable(),location:z.string().optional().nullable(),outstanding:z.coerce.number().min(0)});
export async function GET(){return NextResponse.json(await prisma.customer.findMany({include:{orders:true},orderBy:{name:"asc"}}))}
export async function POST(req:Request){const p=schema.safeParse(await req.json());if(!p.success)return NextResponse.json({error:"Invalid customer data"},{status:400});try{return NextResponse.json(await prisma.customer.create({data:p.data}),{status:201})}catch{return NextResponse.json({error:"Customer name already exists"},{status:409})}}
