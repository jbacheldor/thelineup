'use server'
import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword, User } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import app from "../createClient";
import { setCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest){
    const res = new NextResponse();
    var user = null
    try {
        const {email, password} = await req.json()
        const auth = getAuth(app);
        setPersistence(auth, browserSessionPersistence)
        const response:NextResponse | User = await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            user = userCredential.user;

            await setCookie('access-token', user.accessToken, { cookies, httpOnly: true,  secure: true });
            await setCookie('refresh-token', user.refreshToken, {cookies, httpOnly: true,  secure: true });

            return NextResponse.json(
                {user: {
                    refreshToken: user.refreshToken,
                    accessToken: user.accessToken,
                }},
                {status: 200}
            )
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Error in hitting auth: ${errorCode}: ${errorMessage}`)
            // throw new Error(`Error in hitting auth: ${errorCode}: ${errorMessage}`)
            return NextResponse.json(
                {error: errorMessage},
                {status: 401}
            )
        })

        const res_json = await response.json()
        // console.log("", await res.body)

        if(res.status == 200) {
            return NextResponse.json(
                {body:  res_json},
                {status: response.status},
            )
        }
        else {
            return NextResponse.json(
                {error: "womp womp womp, looks like something is funky around here"},
                {status: response.status},
            )
        }
    }catch (e){
        console.log('error in authenticating via password with firebase', e)
        return NextResponse.json(
            {error: 'error in authenticating with password'},
            {status: 400}
        )
    }
}
