import {NextResponse} from "next/server";
export const runtime="nodejs";
export async function POST(){return NextResponse.json({error:"Fitur bid tidak digunakan. Admin akan menugaskan kurir aktif."},{status:410})}
export async function DELETE(){return NextResponse.json({error:"Fitur bid tidak digunakan."},{status:410})}
