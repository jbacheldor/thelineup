import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
    const id = request.nextUrl.searchParams.get('id')
    try {
        

        // call client
        // make call & request all info

    } catch(e){
        console.log('eeee and error', e)
        return NextResponse.json({
            'error': `error getting crush info: ${id}`,
            'status': 500
        })
    }
}