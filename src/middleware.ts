//middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./app/utils";

// http proxy vs middleware in next js 

const protectedRoutes = ["/settings", "/leaderboard", "/server/getcrushes"];

export default function middleware(req: NextRequest) {
  const auth = (!req.cookies.get('access-token') ? false : true)
  const {value} = req.cookies.get('access-token')

  verifyJWT(value)

  // console.log('parsing thy jwt', parseJwt()
  // we should verify auth,,,,

  // if not authenticated and the protected route array includes the given string
  // redirect !
  if (!auth && protectedRoutes.includes(req.nextUrl.pathname)) {
    // do we have an absolute url to redirect to???
    return NextResponse.json({
      error: 'not permitted ! violation weewhooweewhoo'
    })
    // const absoluteURL = new URL("/", req.nextUrl.origin);
    // return NextResponse.redirect(absoluteURL.toString());
  }
  if(auth && protectedRoutes.includes(req.nextUrl.pathname)){
    // then get the http only cookies and send those on or whateverrr
    // maybe do a little verify in it or something
  }

  // can also get getServerSideProps 
}

export const config = {
  // matcher: ["/", "/getcrushes", "/server"],
  matcher: ['/server/:path*'],
};