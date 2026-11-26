import {NextResponse} from "next/server";
import {driversRepository} from "@/lib/repositories/drivers";
import {ApiError,handleError,positiveId,readBody,validToken} from "@/lib/services/api";
export const runtime="nodejs";
export async function PATCH(req:Request,{params}:{params:Promise<{token:string}>}){try{const {token}=await params;const driver=validToken(token)?driversRepository.findByToken(token):undefined;if(!driver)throw new ApiError(404,"Tautan kurir tidak ditemukan.");const b=await readBody(req);if(!positiveId(b.id))throw new ApiError(400,"Notifikasi tidak valid.");if(!driversRepository.markRead(b.id,driver.id))throw new ApiError(404,"Notifikasi tidak ditemukan.");return NextResponse.json({ok:true})}catch(e){return handleError(e,"Gagal memperbarui notifikasi.")}}
