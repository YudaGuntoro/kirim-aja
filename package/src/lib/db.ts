import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { DEMO_TRACKING_TOKEN } from "./demo-tracking";
const dir = process.env.KIRIMAJA_DATA_DIR || path.join(process.cwd(), "data");
fs.mkdirSync(dir, {recursive:true});
const db = new DatabaseSync(path.join(dir, "delivery.sqlite"));
db.exec("PRAGMA busy_timeout = 15000");
db.exec("PRAGMA foreign_keys = ON");
db.exec("BEGIN IMMEDIATE");
try {
db.exec(`CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, sender TEXT NOT NULL, phone TEXT NOT NULL, pickup TEXT NOT NULL, destination TEXT NOT NULL, recipient TEXT NOT NULL, service TEXT NOT NULL, item TEXT NOT NULL, notes TEXT NOT NULL DEFAULT '', price INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'Baru', created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
db.exec(`CREATE TABLE IF NOT EXISTS partner_applications (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, name TEXT NOT NULL, phone TEXT NOT NULL, location TEXT NOT NULL, details TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
const columns = db.prepare("PRAGMA table_info(orders)").all() as {name:string}[];
for (const name of ["vehicle", "pickup_date", "pickup_time", "lifting_help", "tracking_token", "driver_name"]) {
 if (!columns.some(column => column.name === name)) db.exec(`ALTER TABLE orders ADD COLUMN ${name} TEXT NOT NULL DEFAULT ''`);
}
if (!columns.some(column => column.name === "assigned_driver_id")) db.exec("ALTER TABLE orders ADD COLUMN assigned_driver_id INTEGER");
db.exec(`CREATE TABLE IF NOT EXISTS drivers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL DEFAULT '', active INTEGER NOT NULL DEFAULT 1, access_token TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
db.exec(`CREATE TABLE IF NOT EXISTS driver_bids (id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER NOT NULL REFERENCES orders(id), driver_id INTEGER NOT NULL REFERENCES drivers(id), status TEXT NOT NULL DEFAULT 'Menunggu', created_at TEXT NOT NULL DEFAULT (datetime('now')), UNIQUE(order_id,driver_id))`);
db.exec(`CREATE TABLE IF NOT EXISTS driver_notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, driver_id INTEGER NOT NULL REFERENCES drivers(id), order_id INTEGER NOT NULL REFERENCES orders(id), read_at TEXT, created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
db.exec("COMMIT");
} catch (error) { db.exec("ROLLBACK"); throw error; }
// Versioned, non-destructive schema migration; historical free-text assignments are retained.
db.exec("CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT (datetime('now')))");
if (!db.prepare("SELECT version FROM schema_migrations WHERE version=1").get()) {
 db.exec("BEGIN IMMEDIATE");
 try {
  db.exec("CREATE INDEX IF NOT EXISTS idx_orders_tracking_token ON orders(tracking_token)");
  db.exec("CREATE INDEX IF NOT EXISTS idx_orders_assigned_driver ON orders(assigned_driver_id, status)");
  db.exec("CREATE INDEX IF NOT EXISTS idx_notifications_driver_read ON driver_notifications(driver_id, read_at)");
  db.exec("CREATE TRIGGER IF NOT EXISTS orders_driver_fk_insert BEFORE INSERT ON orders WHEN NEW.assigned_driver_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM drivers WHERE id=NEW.assigned_driver_id) BEGIN SELECT RAISE(ABORT, 'invalid assigned driver'); END");
  db.exec("CREATE TRIGGER IF NOT EXISTS orders_driver_fk_update BEFORE UPDATE OF assigned_driver_id ON orders WHEN NEW.assigned_driver_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM drivers WHERE id=NEW.assigned_driver_id) BEGIN SELECT RAISE(ABORT, 'invalid assigned driver'); END");
  db.exec("UPDATE orders SET driver_name='' WHERE assigned_driver_id IS NOT NULL AND EXISTS (SELECT 1 FROM drivers WHERE drivers.id=orders.assigned_driver_id)");
  db.prepare("INSERT OR IGNORE INTO schema_migrations (version) VALUES (1)").run();
  db.exec("COMMIT");
 } catch (error) { db.exec("ROLLBACK"); throw error; }
}
// Service and status names are stable natural keys; historical values remain available.
if (!db.prepare("SELECT version FROM schema_migrations WHERE version=2").get()) {
 db.exec("BEGIN IMMEDIATE");
 try {
  db.exec("CREATE TABLE IF NOT EXISTS service_catalog (code TEXT PRIMARY KEY, base_price INTEGER NOT NULL CHECK(base_price>=0), enabled INTEGER NOT NULL DEFAULT 1 CHECK(enabled IN (0,1)))");
  db.exec("CREATE TABLE IF NOT EXISTS order_status_catalog (code TEXT PRIMARY KEY)");
  const addService=db.prepare("INSERT OR IGNORE INTO service_catalog (code,base_price,enabled) VALUES (?,?,1)");
  for (const [code,price] of [["Food Delivery",18000],["Express Courier",28000],["Easy Shopping",45000],["Moving",0],["Palugada",0]] as [string,number][]) addService.run(code,price);
  db.exec("INSERT OR IGNORE INTO service_catalog (code,base_price,enabled) SELECT DISTINCT service,0,0 FROM orders WHERE service<>''");
  const addStatus=db.prepare("INSERT OR IGNORE INTO order_status_catalog (code) VALUES (?)");
  for (const status of ["Baru","Diproses","Kurir menuju lokasi","Dalam perjalanan","Selesai","Dibatalkan"]) addStatus.run(status);
  db.exec("INSERT OR IGNORE INTO order_status_catalog (code) SELECT DISTINCT status FROM orders WHERE status<>''");
  db.exec("CREATE TRIGGER IF NOT EXISTS orders_catalog_insert BEFORE INSERT ON orders WHEN NOT EXISTS (SELECT 1 FROM service_catalog WHERE code=NEW.service) OR NOT EXISTS (SELECT 1 FROM order_status_catalog WHERE code=NEW.status) BEGIN SELECT RAISE(ABORT, 'invalid order catalog reference'); END");
  db.exec("CREATE TRIGGER IF NOT EXISTS orders_catalog_update BEFORE UPDATE OF service,status ON orders WHEN NOT EXISTS (SELECT 1 FROM service_catalog WHERE code=NEW.service) OR NOT EXISTS (SELECT 1 FROM order_status_catalog WHERE code=NEW.status) BEGIN SELECT RAISE(ABORT, 'invalid order catalog reference'); END");
  db.prepare("INSERT OR IGNORE INTO schema_migrations (version) VALUES (2)").run();
  db.exec("COMMIT");
 } catch (error) { db.exec("ROLLBACK"); throw error; }
}
db.exec("CREATE TABLE IF NOT EXISTS admin_sessions (token_hash TEXT PRIMARY KEY, expires_at INTEGER NOT NULL)");
db.exec("CREATE TABLE IF NOT EXISTS admin_login_attempts (id INTEGER PRIMARY KEY AUTOINCREMENT, created_at INTEGER NOT NULL)");
// Contoh publik untuk mencoba halaman pelacakan tanpa data pelanggan nyata.
db.prepare(`INSERT INTO orders (sender,phone,pickup,destination,recipient,service,item,notes,price,status,tracking_token,driver_name)
 SELECT ?,?,?,?,?,?,?,?,?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM orders WHERE tracking_token=?)`).run(
 "Pelanggan Contoh", "080000000000", "Alamat penjemputan contoh", "Alamat tujuan contoh", "Penerima Contoh", "Express Courier", "Paket contoh", "Data demo pelacakan", 28000, "Dalam perjalanan", DEMO_TRACKING_TOKEN, "Driver Contoh", DEMO_TRACKING_TOKEN
);
export default db;
