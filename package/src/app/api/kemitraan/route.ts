import { NextResponse } from "next/server";
import db from "@/lib/db";
import { isAdminRequest } from "@/lib/admin-auth";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function POST(req:Request){try{const b=await req.json();if(!["Mitra Driver","Mitra Resto","Mitra Toko"].includes(b.type)||["name","phone","location"].some(k=>typeof b[k]!=="string"||!b[k].trim()||b[k].length>200)||(b.details && (typeof b.details!=="string"||b.details.length>1000)))return NextResponse.json({error:"Mohon lengkapi data pendaftaran dengan benar."},{status:400});db.prepare("INSERT INTO partner_applications (type,name,phone,location,details) VALUES (?,?,?,?,?)").run(b.type,b.name.trim(),b.phone.trim(),b.location.trim(),(b.details||"").trim());return NextResponse.json({ok:true},{status:201})}catch{return NextResponse.json({error:"Pendaftaran belum dapat disimpan."},{status:500})}}
export async function GET(req:Request){if(!isAdminRequest(req))return NextResponse.json({error:"Akses ditolak."},{status:401});return NextResponse.json(db.prepare("SELECT * FROM partner_applications ORDER BY id DESC").all())}
