'use server'
import { NextRequest, NextResponse } from "next/server";
import { setCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest){
    try {
        const {access_token, refresh_token} = await req.json()

            await setCookie('access-token', `${access_token}`, { cookies, httpOnly: true,  secure: true });
            await setCookie('refresh-token', refresh_token, {cookies, httpOnly: true,  secure: true });

        
            return NextResponse.json(
                {message: 'set cookies successfully',
                status: 200}
            )


    }catch (e){
        console.log('error in authenticating via password with firebase', e)
        return NextResponse.json(
            {error: 'error in authenticating with password'},
            {status: 400}
        )
    }
}