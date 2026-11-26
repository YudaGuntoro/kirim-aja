import {NextResponse} from "next/server";
import {isAdminRequest} from "@/lib/admin-auth";
import {ordersRepository} from "@/lib/repositories/orders";
import {createOrder,statuses} from "@/lib/services/orders";
import {ApiError,handleError,positiveId,readBody} from "@/lib/services/api";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function POST(req:Request){try{return NextResponse.json(createOrder(await readBody(req)),{status:201})}catch(e){return handleError(e,"Pesanan belum dapat disimpan.")}}
export async function GET(req:Request){if(!isAdminRequest(req))return NextResponse.json({error:"Akses ditolak."},{status:401});try{return NextResponse.json(ordersRepository.list(),{headers:{"Cache-Control":"no-store"}})}catch(e){return handleError(e,"Daftar pesanan belum dapat dimuat.")}}
export async function PATCH(req:Request){if(!isAdminRequest(req))return NextResponse.json({error:"Akses ditolak."},{status:401});try{const body=await readBody(req);if(!positiveId(body.id)||typeof body.status!=="string"||!statuses.includes(body.status)||"driver_name" in body||"assigned_driver_id" in body)throw new ApiError(400,"Data pesanan tidak valid.");if(!ordersRepository.updateStatus(body.id,body.status))throw new ApiError(404,"Pesanan tidak ditemukan.");return NextResponse.json({ok:true})}catch(e){return handleError(e,"Gagal memperbarui pesanan.")}}
