import db from "@/lib/db";
export type Driver = {id:number;name:string;active:number};
export const driversRepository = {
 list: () => db.prepare("SELECT id,name,phone,active,access_token,created_at FROM drivers ORDER BY id DESC").all(),
 create: (name:string,phone:string,token:string) => Number(db.prepare("INSERT INTO drivers (name,phone,active,access_token) VALUES (?,?,1,?)").run(name,phone,token).lastInsertRowid),
 setActive: (id:number,active:boolean) => db.prepare("UPDATE drivers SET active=? WHERE id=?").run(active?1:0,id).changes,
 findByToken: (token:string) => db.prepare("SELECT id,name,active FROM drivers WHERE access_token=?").get(token) as Driver|undefined,
 assigned: (id:number) => db.prepare("SELECT id,service,status,pickup,destination,recipient,phone,item,notes FROM orders WHERE assigned_driver_id=? AND status NOT IN ('Selesai','Dibatalkan') ORDER BY id DESC").all(id),
 notifications: (id:number) => db.prepare("SELECT n.id,n.order_id,n.created_at,o.service FROM driver_notifications n JOIN orders o ON o.id=n.order_id WHERE n.driver_id=? AND n.read_at IS NULL ORDER BY n.id DESC").all(id),
 markRead: (id:number,driverId:number) => db.prepare("UPDATE driver_notifications SET read_at=datetime('now') WHERE id=? AND driver_id=? AND read_at IS NULL").run(id,driverId).changes,
 assign: (orderId:number,driverId:number) => {
  db.exec("BEGIN IMMEDIATE");
  try {
   const candidate=db.prepare("SELECT d.name FROM drivers d JOIN orders o ON o.id=? WHERE d.id=? AND d.active=1 AND o.status IN ('Baru','Diproses') AND o.assigned_driver_id IS NULL AND TRIM(o.driver_name)=''").get(orderId,driverId) as {name:string}|undefined;
   if(!candidate){db.exec("ROLLBACK");return false}
   db.prepare("UPDATE orders SET assigned_driver_id=? WHERE id=?").run(driverId,orderId);
   db.prepare("UPDATE driver_bids SET status=CASE WHEN driver_id=? THEN 'Diterima' ELSE 'Ditutup' END WHERE order_id=? AND status='Menunggu'").run(driverId,orderId);
   db.prepare("INSERT INTO driver_notifications (driver_id,order_id) VALUES (?,?)").run(driverId,orderId);
   db.exec("COMMIT");return true;
  }catch(error){db.exec("ROLLBACK");throw error}
 },
};
