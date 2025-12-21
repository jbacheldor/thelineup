import { NextRequest, NextResponse } from "next/server";
import { createDBClient } from "../../tursoClient";

export async function GET(req: NextRequest){
    const id = req.nextUrl.searchParams.get('inviteId')

    try {
        const turso = await createDBClient()
        const res = await turso.execute({
            sql: 'SELECT * FROM invites WHERE uuid = ?',
            args: [id]
        })
    

        // if data.rows[0].status == 'accepted' or 'cancelled'
        // then need to send back error message accordingly

        return NextResponse.json({
            status: 200,
            data: res.rows[0]
        })

    }catch(error){
        console.log('error retrieving invites', error)
        return NextResponse.json({
            error: 'error retrieving invites',
            status: 400
        })
    }

}