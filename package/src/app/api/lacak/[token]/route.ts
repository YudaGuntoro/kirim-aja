import { NextResponse } from "next/server";
import db from "@/lib/db";
export const runtime="nodejs"; export const dynamic="force-dynamic";
export async function GET(_req:Request,{params}:{params:Promise<{token:string}>}) {const {token}=await params;if(!/^[a-f0-9]{48}$/.test(token))return NextResponse.json({error:"Pesanan tidak ditemukan."},{status:404,headers:{"Cache-Control":"no-store"}});const order=db.prepare("SELECT id,service,status,driver_name,created_at FROM orders WHERE tracking_token=?").get(token);if(!order)return NextResponse.json({error:"Pesanan tidak ditemukan."},{status:404,headers:{"Cache-Control":"no-store"}});return NextResponse.json(order,{headers:{"Cache-Control":"no-store"}})}
