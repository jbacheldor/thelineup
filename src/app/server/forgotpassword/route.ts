import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import app from "../createClient";

export async function POST(request: NextRequest){

  try {
    const { email } = await request.json()
    const auth = getAuth(app);
    const res = await sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..

        return NextResponse.json({
          'message': 'Password reset email sent!!',
          'status': 200,
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
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

  }catch (e){
    console.log('caught an error: ', e)
    return NextResponse.json({
      'error': 'wheeeep something went horribly wrong!!',
      'status': 404
    })
  }
  
}