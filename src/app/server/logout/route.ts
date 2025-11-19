'use server'
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST() {
    try {
        // PELASE FOR THE LOVE OF PEARLS REMEMBER TO UNCOMMENT THIS
        // WHEN U R DONE TROUBLESHOOTING
        
        // const cookieStore = await cookies()
        // cookieStore.delete('access-token')
        // cookieStore.delete('refresh-token')

        return NextResponse.json({
            message: 'logout successful',
            status: 200
        })
    } catch(error) {
        console.log('error occurring: ', error)
        
        return NextResponse.json({
            message: 'logout unsuccessful',
            status: 400
        })

    }
}