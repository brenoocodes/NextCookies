import { NextRequest, NextResponse } from "next/server";
import { getCookiesServer } from "./lib/cokiesServer";


export async function middleware(req){

    const { pathname } = req.nextUrl
    const token = await getCookiesServer();

    if (pathname === '/dashboard'){
        if (!token){
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }



    return NextResponse.next()

}