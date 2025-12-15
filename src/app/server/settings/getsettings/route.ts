import { createDBClient } from "@/app/tursoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // 'use cache'
    const id = req.nextUrl.searchParams.get('id')
    
    // // get contact info
    try {
        const turso = createDBClient()
        // // get membership

        // // this works within sql console query
        const member = await turso.execute({
            sql: "SELECT user_id, name, email FROM User WHERE user_id in (SELECT user_id FROM Membership WHERE instance_id = (SELECT instance_id FROM Instance WHERE owner_id = ?))",
            args: [id]
        })

        const invites = await turso.execute({
            sql: 'SELECT name, email, sent_on, uuid FROM invites WHERE (from_user = ? AND status != "cancelled")',
            args: [id]
        })



        return NextResponse.json({
            status: 200,
            data: {
                friends: member.rows,
                invites: invites.rows
            }
        })
    }catch(error) {
        console.log('error in getting settings: ', error)
        return NextResponse.json({
            status: 400,
            message: 'error trying to fetch turso data'
        })
    }


        return NextResponse.json({
            status: 200,
            message: 'aye'
        })
    // get invites sent
}