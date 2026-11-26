import {NextResponse} from "next/server";
import {isAdminRequest} from "@/lib/admin-auth";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(req:Request){if(!isAdminRequest(req))return NextResponse.json({error:"Akses ditolak."},{status:401});return NextResponse.json({error:"Fitur bid tidak digunakan."},{status:410})}
