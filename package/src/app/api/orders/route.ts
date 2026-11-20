import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import db from "@/lib/db";
import { isAdminRequest } from "@/lib/admin-auth";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const prices: Record<string,number> = { "Food Delivery": 18000, "Express Courier": 28000, "Easy Shopping": 45000, "Moving": 0, "Palugada": 0 };
export async function POST(req: Request) {
 try { const b = await req.json(); const fields = ["sender","phone","pickup","destination","recipient","service","item"];
 if (fields.some(k => typeof b[k] !== "string" || !b[k].trim() || b[k].length > 500) || !(b.service in prices) || (b.notes && (typeof b.notes !== "string" || b.notes.length > 1000))) return NextResponse.json({error:"Mohon lengkapi data pesanan dengan benar."},{status:400});
 const extraFields = ["vehicle", "pickup_date", "pickup_time", "lifting_help"];
 if (b.service === "Moving" && (extraFields.some(k => typeof b[k] !== "string" || !b[k].trim() || b[k].length > 100) || !["Mobil","Pikap","Van","Belum yakin"].includes(b.vehicle) || !["Ya, butuh bantuan","Tidak perlu","Belum yakin"].includes(b.lifting_help) || !/^\d{4}-\d{2}-\d{2}$/.test(b.pickup_date) || !/^\d{2}:\d{2}$/.test(b.pickup_time))) return NextResponse.json({error:"Mohon lengkapi detail angkut dan pindahan."},{status:400});
 if (b.service === "Palugada" && (typeof b.pickup_date !== "string" || typeof b.pickup_time !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(b.pickup_date) || !/^\d{2}:\d{2}$/.test(b.pickup_time))) return NextResponse.json({error:"Mohon lengkapi tanggal dan waktu pekerjaan."},{status:400});
 const extras = extraFields.map(k => b.service === "Moving" || (b.service === "Palugada" && (k === "pickup_date" || k === "pickup_time")) ? b[k].trim() : "");
 const token = randomBytes(24).toString("hex");
 const result = db.prepare("INSERT INTO orders (sender,phone,pickup,destination,recipient,service,item,notes,price,vehicle,pickup_date,pickup_time,lifting_help,tracking_token) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)").run(...fields.map(k=>b[k].trim()), (b.notes || "").trim(), prices[b.service], ...extras, token);
 return NextResponse.json({id:Number(result.lastInsertRowid),trackingToken:token}, {status:201});
 } catch { return NextResponse.json({error:"Pesanan belum dapat disimpan."},{status:500}); }
}
export async function GET(req: Request) { if (!isAdminRequest(req)) return NextResponse.json({error:"Akses ditolak. Atur ADMIN_PASSWORD di server."},{status:401}); return NextResponse.json(db.prepare("SELECT * FROM orders ORDER BY id DESC").all()); }
export async function PATCH(req: Request) { if (!isAdminRequest(req)) return NextResponse.json({error:"Akses ditolak."},{status:401}); try {const {id,status,driver_name}=await req.json(); if (!Number.isInteger(id) || (status === undefined && driver_name === undefined) || (status !== undefined && !["Baru","Diproses","Kurir menuju lokasi","Dalam perjalanan","Selesai","Dibatalkan"].includes(status)) || (driver_name !== undefined && (typeof driver_name !== "string" || driver_name.length > 100))) return NextResponse.json({error:"Data tidak valid."},{status:400}); const order=db.prepare("SELECT id FROM orders WHERE id=?").get(id); if(!order)return NextResponse.json({error:"Pesanan tidak ditemukan."},{status:404}); if(status!==undefined) db.prepare("UPDATE orders SET status=? WHERE id=?").run(status,id); if(driver_name!==undefined) db.prepare("UPDATE orders SET driver_name=? WHERE id=?").run(driver_name.trim(),id); return NextResponse.json({ok:true}); } catch {return NextResponse.json({error:"Gagal memperbarui pesanan."},{status:500});} }
