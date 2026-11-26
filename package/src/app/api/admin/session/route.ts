import {NextResponse} from "next/server";
import {allowLoginAttempt,createAdminSession,deleteAdminSession,isAdminRequest,sessionCookie,verifyCredentials} from "@/lib/admin-auth";
import {ApiError,handleError,readBody} from "@/lib/services/api";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function POST(req:Request){try{const b=await readBody(req);const valid=verifyCredentials(b.username,b.password);if(!allowLoginAttempt(valid))throw new ApiError(429,"Terlalu banyak percobaan masuk. Coba lagi dalam 15 menit.");if(!valid)throw new ApiError(401,"Username atau kata sandi salah.");const response=NextResponse.json({username:process.env.ADMIN_USERNAME||"admin"},{headers:{"Cache-Control":"no-store"}});response.headers.append("Set-Cookie",sessionCookie(createAdminSession()));return response}catch(e){return handleError(e,"Gagal masuk.")}}
export async function GET(req:Request){if(!isAdminRequest(req))return NextResponse.json({error:"Akses ditolak."},{status:401,headers:{"Cache-Control":"no-store"}});return NextResponse.json({username:process.env.ADMIN_USERNAME||"admin"},{headers:{"Cache-Control":"no-store"}})}
export async function DELETE(req:Request){try{deleteAdminSession(req);const response=NextResponse.json({ok:true});response.headers.append("Set-Cookie",sessionCookie("",0));return response}catch(e){return handleError(e,"Gagal keluar.")}}
