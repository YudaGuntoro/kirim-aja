import {NextResponse} from "next/server";
import {randomBytes} from "node:crypto";
import {isAdminRequest} from "@/lib/admin-auth";
import {driversRepository} from "@/lib/repositories/drivers";
import {ApiError,handleError,positiveId,readBody} from "@/lib/services/api";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(req:Request){if(!isAdminRequest(req))return NextResponse.json({error:"Akses ditolak."},{status:401});try{return NextResponse.json(driversRepository.list(),{headers:{"Cache-Control":"no-store"}})}catch(e){return handleError(e,"Daftar kurir belum dapat dimuat.")}}
export async function POST(req:Request){if(!isAdminRequest(req))return NextResponse.json({error:"Akses ditolak."},{status:401});try{const b=await readBody(req);if(typeof b.name!=="string"||!b.name.trim()||b.name.length>100||typeof b.phone!=="string"||b.phone.length>30)throw new ApiError(400,"Isi nama dan nomor telepon dengan benar.");return NextResponse.json({id:driversRepository.create(b.name.trim(),b.phone.trim(),randomBytes(24).toString("hex"))},{status:201})}catch(e){return handleError(e,"Gagal menambahkan kurir.")}}
export async function PATCH(req:Request){if(!isAdminRequest(req))return NextResponse.json({error:"Akses ditolak."},{status:401});try{const b=await readBody(req);if(!positiveId(b.id)||typeof b.active!=="boolean")throw new ApiError(400,"Data tidak valid.");if(!driversRepository.setActive(b.id,b.active))throw new ApiError(404,"Kurir tidak ditemukan.");return NextResponse.json({ok:true})}catch(e){return handleError(e,"Gagal mengubah status kurir.")}}
