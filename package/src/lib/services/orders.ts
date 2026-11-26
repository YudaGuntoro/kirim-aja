import {randomBytes} from "node:crypto";
import {ApiError} from "@/lib/services/api";
import {ordersRepository} from "@/lib/repositories/orders";
export const statuses=["Baru","Diproses","Kurir menuju lokasi","Dalam perjalanan","Selesai","Dibatalkan"];
function dateIsValid(value:string){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const d=new Date(value+"T00:00:00Z");return !Number.isNaN(d.valueOf())&&d.toISOString().slice(0,10)===value}
function timeIsValid(value:string){return /^([01]\d|2[0-3]):[0-5]\d$/.test(value)}
export function createOrder(b:Record<string,unknown>){const keys=["sender","phone","pickup","destination","recipient","service","item"];
 if(keys.some(k=>typeof b[k]!=="string"||!(b[k] as string).trim()||(b[k] as string).length>500)||!ordersRepository.servicePrice(b.service as string)|| (b.notes!==undefined&&(typeof b.notes!=="string"||b.notes.length>1000)))throw new ApiError(400,"Mohon lengkapi data pesanan dengan benar.");
 const service=b.service as string;const extras=["vehicle","pickup_date","pickup_time","lifting_help"];
 if(service==="Moving"&&(extras.some(k=>typeof b[k]!=="string"||!(b[k] as string).trim()||(b[k] as string).length>100)||!["Mobil","Pikap","Van","Belum yakin"].includes(b.vehicle as string)||!["Ya, butuh bantuan","Tidak perlu","Belum yakin"].includes(b.lifting_help as string)))throw new ApiError(400,"Mohon lengkapi detail angkut dan pindahan.");
 if((service==="Moving"||service==="Palugada")&&(typeof b.pickup_date!=="string"||typeof b.pickup_time!=="string"||!dateIsValid(b.pickup_date)||!timeIsValid(b.pickup_time)))throw new ApiError(400,"Tanggal atau waktu penjemputan tidak valid.");
 const values=extras.map(k=>service==="Moving"||(service==="Palugada"&&(k==="pickup_date"||k==="pickup_time"))?(b[k] as string).trim():"");const token=randomBytes(24).toString("hex");
 const id=ordersRepository.create([...keys.map(k=>(b[k] as string).trim()),((b.notes as string)||"").trim()],ordersRepository.servicePrice(service)!.base_price,values,token);return {id,trackingToken:token};
}
