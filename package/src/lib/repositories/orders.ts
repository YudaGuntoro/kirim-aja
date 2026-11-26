import db from "@/lib/db";

export const ordersRepository = {
 servicePrice: (code:string) => db.prepare("SELECT base_price FROM service_catalog WHERE code=? AND enabled=1").get(code) as {base_price:number}|undefined,
 list: () => db.prepare("SELECT o.*, COALESCE(d.name, o.driver_name) AS driver_name FROM orders o LEFT JOIN drivers d ON d.id=o.assigned_driver_id ORDER BY o.id DESC").all(),
 create: (fields: string[], price: number, extras: string[], token: string) => Number(db.prepare("INSERT INTO orders (sender,phone,pickup,destination,recipient,service,item,notes,price,vehicle,pickup_date,pickup_time,lifting_help,tracking_token) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)").run(...fields,price,...extras,token).lastInsertRowid),
 updateStatus: (id: number, status: string) => db.prepare("UPDATE orders SET status=? WHERE id=?").run(status,id).changes,
 findTracking: (token: string) => db.prepare("SELECT o.id,o.service,o.status,COALESCE(d.name,o.driver_name) AS driver_name,o.created_at FROM orders o LEFT JOIN drivers d ON d.id=o.assigned_driver_id WHERE o.tracking_token=?").get(token),
};
