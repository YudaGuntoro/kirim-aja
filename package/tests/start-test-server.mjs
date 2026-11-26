import {mkdtempSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {spawn} from "node:child_process";
import {DatabaseSync} from "node:sqlite";
const dataDir=mkdtempSync(join(tmpdir(),"kirimaja-api-test-"));
// Seed an older schema to verify migration without touching the application's data.
const fixture=new DatabaseSync(join(dataDir,"delivery.sqlite"));
fixture.exec(`CREATE TABLE orders (id INTEGER PRIMARY KEY AUTOINCREMENT, sender TEXT NOT NULL, phone TEXT NOT NULL, pickup TEXT NOT NULL, destination TEXT NOT NULL, recipient TEXT NOT NULL, service TEXT NOT NULL, item TEXT NOT NULL, notes TEXT NOT NULL DEFAULT '', price INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'Baru', created_at TEXT NOT NULL DEFAULT (datetime('now')), driver_name TEXT NOT NULL DEFAULT '', assigned_driver_id INTEGER);
 CREATE TABLE drivers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL DEFAULT '', active INTEGER NOT NULL DEFAULT 1, access_token TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL DEFAULT (datetime('now')));
 INSERT INTO drivers (id,name,access_token) VALUES (1,'Kurir lama','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
 INSERT INTO orders (id,sender,phone,pickup,destination,recipient,service,item,price,driver_name,assigned_driver_id) VALUES (1,'Migrasi tes','0800','A','B','Penerima','Express Courier','Paket',28000,'Nama lama',1);
 INSERT INTO orders (id,sender,phone,pickup,destination,recipient,service,item,price,driver_name) VALUES (2,'Riwayat tes','0800','A','B','Penerima','Express Courier','Paket',28000,'Kurir bebas');`);
fixture.close();
const child=spawn(process.execPath,["node_modules/next/dist/bin/next","dev","--port","3197"],{cwd:process.cwd(),stdio:"inherit",env:{...process.env,KIRIMAJA_DATA_DIR:dataDir,KIRIMAJA_NEXT_DIST_DIR:".verify-tests/.next",ADMIN_USERNAME:"test-admin",ADMIN_PASSWORD:"test-password-unique"}});
for(const signal of ["SIGINT","SIGTERM"])process.on(signal,()=>{child.kill(signal)});
child.on("exit",code=>process.exit(code??1));
