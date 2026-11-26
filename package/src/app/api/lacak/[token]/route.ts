import {NextResponse} from "next/server";
import {ordersRepository} from "@/lib/repositories/orders";
import {handleError,validToken} from "@/lib/services/api";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(_req:Request,{params}:{params:Promise<{token:string}>}){try{const {token}=await params;const order=validToken(token)?ordersRepository.findTracking(token):undefined;if(!order)return NextResponse.json({error:"Pesanan tidak ditemukan."},{status:404,headers:{"Cache-Control":"no-store"}});return NextResponse.json(order,{headers:{"Cache-Control":"no-store"}})}catch(e){return handleError(e,"Pelacakan belum dapat dimuat.")}}
