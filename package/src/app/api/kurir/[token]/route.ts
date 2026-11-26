import {NextResponse} from "next/server";
import {driversRepository} from "@/lib/repositories/drivers";
import {ApiError,handleError,readBody,validToken} from "@/lib/services/api";
export const runtime="nodejs";export const dynamic="force-dynamic";
type Params={params:Promise<{token:string}>};
function getDriver(token:string){const driver=validToken(token)?driversRepository.findByToken(token):undefined;if(!driver)throw new ApiError(404,"Tautan kurir tidak ditemukan.");return driver}
export async function GET(_req:Request,{params}:Params){try{const driver=getDriver((await params).token);return NextResponse.json({driver,assigned:driversRepository.assigned(driver.id),notifications:driversRepository.notifications(driver.id)},{headers:{"Cache-Control":"no-store"}})}catch(e){return handleError(e,"Data kurir belum dapat dimuat.")}}
export async function PATCH(req:Request,{params}:Params){try{const driver=getDriver((await params).token);const b=await readBody(req);if(typeof b.active!=="boolean")throw new ApiError(400,"Status tidak valid.");driversRepository.setActive(driver.id,b.active);return NextResponse.json({ok:true})}catch(e){return handleError(e,"Gagal mengubah status.")}}
