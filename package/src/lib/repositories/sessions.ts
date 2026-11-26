import db from "@/lib/db";
export const sessionsRepository={
 recordAttempt:(valid:boolean,now:number)=>{
  db.exec("BEGIN IMMEDIATE");
  try {db.prepare("DELETE FROM admin_login_attempts WHERE created_at<=?").run(now-900);const row=db.prepare("SELECT COUNT(*) AS count FROM admin_login_attempts").get() as {count:number};if(row.count>=10){db.exec("COMMIT");return false}if(valid)db.exec("DELETE FROM admin_login_attempts");else db.prepare("INSERT INTO admin_login_attempts (created_at) VALUES (?)").run(now);db.exec("COMMIT");return true}catch(e){db.exec("ROLLBACK");throw e}
 },
 isValid:(hash:string,now:number)=>Boolean(db.prepare("SELECT 1 FROM admin_sessions WHERE token_hash=? AND expires_at>?").get(hash,now)),
 create:(hash:string,now:number,expires:number)=>{db.prepare("DELETE FROM admin_sessions WHERE expires_at<=?").run(now);db.prepare("INSERT INTO admin_sessions (token_hash,expires_at) VALUES (?,?)").run(hash,expires)},
 delete:(hash:string)=>db.prepare("DELETE FROM admin_sessions WHERE token_hash=?").run(hash),
};
