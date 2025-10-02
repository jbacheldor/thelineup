
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import app from "../createClient";

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://localhost:3000/',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
        bundleId: 'com.example.ios'
    },
    android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
    },
    // The domain must be configured in Firebase Hosting and owned by the project.
    linkDomain: 'https://lineup--thelineup-96277.us-central1.hosted.app/'
};



export async function POST(request: NextRequest) {

    try {
        const { email } = await request.json();
        const auth = getAuth(app)
        const res = await sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then((data) => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem('emailForSignIn', email);
            
            return NextResponse.json({
                'message': 'login email link sent!!',
                'status': 200,
            })
           
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...

            console.log(`Error in hitting auth: ${errorCode}: ${errorMessage}`)
            // throw new Error(`Error in hitting auth: ${errorCode}: ${errorMessage}`)
            return NextResponse.json(
                {error: errorMessage},
                {status: 401}
            )
        });

        const res_json = await res.json()

        if(res.status == 200) {
            return NextResponse.json({
                body:  res_json,
                status: res.status,
            })
        }
            else {
                return NextResponse.json(
                    {error: "womp womp womp, looks like something is funky around here"},
                    {status: res.status},
                )
            }

    }catch(e){
        return NextResponse.json(
            {
                error: 'wheeelp error in getting THAT email link',
                status: 404
            }
        )
    }
}