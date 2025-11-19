'use server'
import { parseJwt, validateJWT, verifyJWT } from "@/app/utils"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(){
    console.log('we are in check login!')
    try {
        const cookieStore = await cookies()
        const access_token = cookieStore.get('access-token')

        if(access_token) {
            const parsed = parseJwt(access_token.value)
            const exp = validateJWT(parsed)
            // This is failing,,, and it shouldn't BE!
            const verify = await verifyJWT(access_token.value)

            if(!verify) {
                console.log('is unverified?')
                cookieStore.delete('access-token')
                cookieStore.delete('refresh-token')
                return NextResponse.json({
                    data: 'unauthorized', 
                    status: 401
                })
            }
            // need to change this to NOT! expired
            if(exp) {
                console.log('is expired?')
                return NextResponse.json({
                    data: 'refresh', 
                    status: 403
                })
            }
            else {
                // then u also need to send data object back,,,
                console.log('else??? parsed', parsed)
                return NextResponse.json({
                    data: parsed, 
                    status: 200
                })
            }
        }
        else {
            return NextResponse.json({
                data: 'unauthorized', 
                status: 401
            })
        }

    }catch(error){
        console.log('error occurring: ', error)
        return NextResponse.json({
            error: 'error checking for cookies ',
            status: 400
        })
    }
}