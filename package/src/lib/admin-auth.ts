import {createHash,randomBytes,timingSafeEqual} from "node:crypto";
import {sessionsRepository} from "@/lib/repositories/sessions";
const COOKIE="kirimaja_admin_session";
const lifetimeSeconds=8*60*60;
function hash(token:string){return createHash("sha256").update(process.env.ADMIN_USERNAME||"admin").update("\0").update(process.env.ADMIN_PASSWORD||"").update("\0").update(token).digest("hex")}
function equal(a:string,b:string){const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y)}
export function verifyCredentials(username:unknown,password:unknown){const configured=process.env.ADMIN_PASSWORD;return typeof username==="string"&&typeof password==="string"&&Boolean(configured)&&equal(username,process.env.ADMIN_USERNAME||"admin")&&equal(password,configured!)}
function getToken(request:Request){const raw=request.headers.get("cookie")||"";const token=raw.split(";").map(part=>part.trim()).find(part=>part.startsWith(COOKIE+"="))?.slice(COOKIE.length+1)||"";return /^[a-f0-9]{64}$/.test(token)?token:""}
export function isAdminRequest(request:Request):boolean{const token=getToken(request);if(!token)return false;return sessionsRepository.isValid(hash(token),Math.floor(Date.now()/1000))}
export function allowLoginAttempt(valid:boolean){return sessionsRepository.recordAttempt(valid,Math.floor(Date.now()/1000))}
export function createAdminSession(){const token=randomBytes(32).toString("hex");const now=Math.floor(Date.now()/1000);sessionsRepository.create(hash(token),now,now+lifetimeSeconds);return token}
export function deleteAdminSession(request:Request){const token=getToken(request);if(token)sessionsRepository.delete(hash(token))}
export function sessionCookie(token:string,maxAge=lifetimeSeconds){return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${process.env.NODE_ENV==="production"?"; Secure":""}`}
