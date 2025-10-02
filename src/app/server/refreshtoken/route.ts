'use server'
import { getAuth } from "firebase/auth";
import app from "../createClient";
import { NextRequest, NextResponse } from 'next/server';
import { setCookie, getCookie, getCookies } from 'cookies-next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const res = new NextResponse();
    const auth = getAuth(app);

    console.log('what the frick is auth', auth)
    try {
    
        // force refresh is true
        if(auth.currentUser) {
        const accessToken: string = await auth.currentUser.getIdToken(true)

        console.log('access-token????', accessToken)

        await setCookie('access-token', accessToken, { cookies, httpOnly: true, secure: true });
        
        var key = 'access-token'
        // response.headers.set(key, res)
        // set http-only cookie (i think)
        // setCookie(key, res)
        
        return NextResponse.json(
            {   body: res,
                status: 200
            }
        )
        }
        else {
            throw Error('the auth current user is not here!!')
        }



    } catch (error) {
        console.log(error)
        return NextResponse.json(
            
                {error: 'womp womp womp could NOT renew token girly pop'},
                {status: 400}
            
        )
    }

}