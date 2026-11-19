import { NextResponse, type NextRequest } from "next/server";
export function middleware(request: NextRequest) {
 const host=(request.headers.get("host") || "").toLowerCase().split(":")[0];
 if (host === "panel-kirim-aja.nusakaryadigital.com" && request.nextUrl.pathname === "/") {
  const url=request.nextUrl.clone(); url.pathname="/admin"; return NextResponse.redirect(url);
 }
 return NextResponse.next();
}
export const config = { matcher: ["/"] };
