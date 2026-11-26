import {NextResponse} from "next/server";
export class ApiError extends Error {constructor(public status:number,message:string){super(message)}}
export async function readBody(req:Request):Promise<Record<string,unknown>> {let body:unknown;try{body=await req.json()}catch{throw new ApiError(400,"Format data tidak valid.")}if(!body||typeof body!=="object"||Array.isArray(body))throw new ApiError(400,"Format data tidak valid.");return body as Record<string,unknown>}
export function handleError(error:unknown,message:string){if(error instanceof ApiError)return NextResponse.json({error:error.message},{status:error.status});console.error("[KirimAja API]",message,error instanceof Error?error.message:"Unknown error");return NextResponse.json({error:message},{status:500})}
export function positiveId(value:unknown):value is number{return typeof value==="number"&&Number.isSafeInteger(value)&&value>0}
export function validToken(token:string){return /^[a-f0-9]{48}$/.test(token)}
