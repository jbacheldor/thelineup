import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import app from "../createClient";
import { json } from "stream/consumers";

export async function POST(request: NextRequest){
    var user = null
    try {
        const {email, password} = await request.json()
        const auth = getAuth(app);
        const res:NextResponse | User = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            user = userCredential.user;
            // would be cooool, if we could like,,,,
            // gather this data and figure out who exactly is logged in
            // and what level of access they should get
            // i can probably implement this...
            return NextResponse.json(
                {user: {
                    refreshToken: user.refreshToken,
                    accessToken: user.accessToken,
                    expirationTime: user.expirationTime,
                    uid: user.uid,
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

        const res_json = await res.json()
        // console.log("", await res.body)

        if(res.status == 200) {
            return NextResponse.json(
                {body:  res_json},
                {status: res.status},
            )
        }
        else {
            return NextResponse.json(
                {error: "womp womp womp, looks like something is funky around here"},
                {status: res.status},
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
