import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";


export async function PATCH(req: NextRequest){
    const resend_key = process.env.RESEND_KEY
    const pathName = process.env.BASE_URL

    const {email, name, instance, uuid} = await req.json()

    try {
        const resend = new Resend(resend_key);
        resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: `Your invite is waiting`,
        html: `<h4>Hello ${name}</h4><p>${name} has invited you to their Crush Leaderboard! Join here: <a>${pathName}/signup/instance?=${instance}/${uuid}</a></p>`
        });

        return NextResponse.json({
            message: 'successfuly reminded!',
            status: 200,
        })

    }catch(error){
        console.log('error resending email', error)
        return NextResponse.json({
            message: 'error resending email',
            status: 400
        })
    }
}