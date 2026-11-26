import {NextResponse} from "next/server";
import {isAdminRequest} from "@/lib/admin-auth";
import {partnersRepository} from "@/lib/repositories/partners";
import {ApiError,handleError,readBody} from "@/lib/services/api";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function POST(req:Request){try{const b=await readBody(req);if(typeof b.type!=="string"||!["Mitra Driver","Mitra Resto","Mitra Toko"].includes(b.type)||["name","phone","location"].some(k=>typeof b[k]!=="string"||!(b[k] as string).trim()||(b[k] as string).length>200)||(b.details!==undefined&&(typeof b.details!=="string"||b.details.length>1000)))throw new ApiError(400,"Mohon lengkapi data pendaftaran dengan benar.");partnersRepository.create(b.type,(b.name as string).trim(),(b.phone as string).trim(),(b.location as string).trim(),((b.details as string)||"").trim());return NextResponse.json({ok:true},{status:201})}catch(e){return handleError(e,"Pendaftaran belum dapat disimpan.")}}
export async function GET(req:Request){if(!isAdminRequest(req))return NextResponse.json({error:"Akses ditolak."},{status:401});try{return NextResponse.json(partnersRepository.list(),{headers:{"Cache-Control":"no-store"}})}catch(e){return handleError(e,"Data kemitraan belum dapat dimuat.")}}
