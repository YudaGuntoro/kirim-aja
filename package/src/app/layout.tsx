import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "KirimAja ? Kirim apa saja, jadi mudah", description: "Layanan antar makanan, kurir, dan belanja yang mudah." };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="id"><body>{children}</body></html> }
