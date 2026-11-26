import {NextResponse} from "next/server";
import {isAdminRequest} from "@/lib/admin-auth";
import {driversRepository} from "@/lib/repositories/drivers";
import {ApiError,handleError,positiveId,readBody} from "@/lib/services/api";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function POST(req:Request){if(!isAdminRequest(req))return NextResponse.json({error:"Akses ditolak."},{status:401});try{const b=await readBody(req);if(!positiveId(b.order_id)||!positiveId(b.driver_id))throw new ApiError(400,"Pilih pesanan dan kurir yang valid.");if(!driversRepository.assign(b.order_id,b.driver_id))throw new ApiError(409,"Kurir tidak aktif atau pesanan sudah ditugaskan.");return NextResponse.json({ok:true})}catch(e){return handleError(e,"Gagal menugaskan kurir.")}}
