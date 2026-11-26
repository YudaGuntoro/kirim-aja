import db from "@/lib/db";
export const partnersRepository = {
 list: () => db.prepare("SELECT * FROM partner_applications ORDER BY id DESC").all(),
 create: (type:string,name:string,phone:string,location:string,details:string) => db.prepare("INSERT INTO partner_applications (type,name,phone,location,details) VALUES (?,?,?,?,?)").run(type,name,phone,location,details),
};
