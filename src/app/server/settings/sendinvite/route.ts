'use server'
import { createDBClient } from '@/app/server/tursoClient';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    const resend_key = process.env.RESEND_KEY
    const pathName = process.env.BASE_URL

    const {form, name, user_id, instance} = await req.json()

    try {
        const turso = await createDBClient()
        
        const date = new Date()

        const uuid =  uuidv4()

        const sent_on = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}`

        await turso.execute({
            sql: "INSERT INTO invites (uuid, email, sent_on, from_user, name, status) VALUES(?, ?, ?, ?, ?, ? )",
            args: [ uuid, form.email, sent_on, user_id, form.name , 'pending']
        })

    }catch(error){
        console.log('error adding in invite', error)
        return NextResponse.json({
            message: 'error adding invite to database',
            status: 400
        })
    }

    try {
        const resend = new Resend(resend_key);
        resend.emails.send({
        from: 'onboarding@resend.dev',
        to: form.email,
        subject: `Join the world of Crush Tracking!`,
        html: `<h4>Hello ${form.name}</h4><p>${name} is inviting you to their Crush Leaderboard! Join here: <a>${pathName}/invite?=${instance}</a></p>`
        });

    }catch(error){
        console.log('error sending out email', error)
        return NextResponse.json({
            message: 'error sending out email',
            status: 400
        })
    }

    return NextResponse.json({
        message: 'email successfully sent!',
        status: 200
    })
    
}