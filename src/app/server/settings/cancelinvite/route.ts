import { createDBClient } from "@/app/server/tursoClient";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest){

    const {id} =  await req.json()

    try {
        const turso = createDBClient()

        await turso.execute({
            sql: `UPDATE invites SET status = 'cancelled' WHERE uuid = ?`,
            args: [id]
        })

            
        return NextResponse.json({
            message: 'Invite successfully cancelled',
            status: '200'
        })
    }
    catch(error){
        console.log('error: ', error)
        return NextResponse.json({
            error: 'trouble creating db instance',
            status: 400
        })
    }
    

}