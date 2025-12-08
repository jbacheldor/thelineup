import { turso } from "@/app/tursoClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    const {id} =  await req.json()

    console.log('what is uuid', id)
    try {
        await turso.execute({
            sql: `UPDATE invites SET status = 'cancelled' WHERE uuid = ?`,
            args: [id]
        })
        
        return NextResponse.json({
            message: 'Invite successfully cancelled',
            status: '200'
        })
    } catch(error){
        console.log('error in updating record in turso')
        return NextResponse.json({
            status: 400,
            message: 'Could not update invite status'
        })
    }
}