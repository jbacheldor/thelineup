import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import app from "../createClient";

export async function POST(request: NextRequest){
    // let user = null
    try {
        const {email, password} = await request.json()
        const auth = getAuth(app);
        const res = signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            let user = userCredential.user;
            // would be cooool, if we could like,,,,
            // gather this data and figure out who exactly is logged in
            // and what level of access they should get
            // i can probably implement this...
            return user 
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
        return NextResponse.json({ res })
    }catch (e){
        console.log('error in authenticating via password with firebase', e)
        return NextResponse.json(
            {error: 'error in authenticating with password'},
            {status: 400}
        )
    }
}
