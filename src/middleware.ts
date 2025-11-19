//middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// http proxy vs middleware in next js 

const protectedRoutes = ["/settings", "/leaderboard", "/server/getcrushes"];
const cookieRoutes = ["/server/checkLogin", "/refreshToken"]

export default async function middleware(req: NextRequest) {

  // if(cookieRoutes.includes(req.nextUrl.pathname)){
  //   console.log('test', req.cookies.get('access-token'))
  // }

  if(protectedRoutes.includes(req.nextUrl.pathname)) {
    const auth = (!req.cookies.get('access-token') ? false : true)
    
    // const value = req.cookies.get('access-token')

    // if(value){ 
    //   await verifyJWT(parseJwt(value))
    // }
    if(!auth){
      return NextResponse.json({
        error: 'not permitted ! violation weewhooweewhoo'
      })  
    }


  }

}

export const config = {
  // matcher: ["/", "/getcrushes", "/server"],
  matcher: ['/server/:path*'],
};