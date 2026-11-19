import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { DEMO_TRACKING_TOKEN } from "./demo-tracking";
const dir = path.join(process.cwd(), "data");
fs.mkdirSync(dir, {recursive:true});
const db = new DatabaseSync(path.join(dir, "delivery.sqlite"));
db.exec(`CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, sender TEXT NOT NULL, phone TEXT NOT NULL, pickup TEXT NOT NULL, destination TEXT NOT NULL, recipient TEXT NOT NULL, service TEXT NOT NULL, item TEXT NOT NULL, notes TEXT NOT NULL DEFAULT '', price INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'Baru', created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
db.exec(`CREATE TABLE IF NOT EXISTS partner_applications (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, name TEXT NOT NULL, phone TEXT NOT NULL, location TEXT NOT NULL, details TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
const columns = db.prepare("PRAGMA table_info(orders)").all() as {name:string}[];
for (const name of ["vehicle", "pickup_date", "pickup_time", "lifting_help", "tracking_token", "driver_name"]) {
 if (!columns.some(column => column.name === name)) db.exec(`ALTER TABLE orders ADD COLUMN ${name} TEXT NOT NULL DEFAULT ''`);
}
// Contoh publik untuk mencoba halaman pelacakan tanpa data pelanggan nyata.
db.prepare(`INSERT INTO orders (sender,phone,pickup,destination,recipient,service,item,notes,price,status,tracking_token,driver_name)
 SELECT ?,?,?,?,?,?,?,?,?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM orders WHERE tracking_token=?)`).run(
 "Pelanggan Contoh", "080000000000", "Alamat penjemputan contoh", "Alamat tujuan contoh", "Penerima Contoh", "Express Courier", "Paket contoh", "Data demo pelacakan", 28000, "Dalam perjalanan", DEMO_TRACKING_TOKEN, "Driver Contoh", DEMO_TRACKING_TOKEN
);
export default db;
