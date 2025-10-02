'use server'
import { getAuth } from "firebase/auth";
import app from "../createClient";
import { NextResponse } from 'next/server';
import { setCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const res = new NextResponse();
    const auth = getAuth(app);

    try {
        // force refresh is true
        if(auth.currentUser) {
        const accessToken: string = await auth.currentUser.getIdToken(true)

        // i don't know if we are supposed to get refresh token as well from this
        await setCookie('access-token', accessToken, { cookies, httpOnly: true, secure: true });
        
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