import { turso } from "@/app/tursoClient";
import { NextRequest, NextResponse } from "next/server";

type user = {
    user_id: string,
    name: string,
    email: string,
    author: boolean,
    numer: string,
}

export async function GET(req: NextRequest) {

    const id = req.nextUrl.searchParams.get('id')
    
    // // get contact info
    try {
        const user = await turso.execute({
            sql: "SELECT * FROM User WHERE user_id = ?",
            args: [id],
        });

        // // get membership

        // // this works within sql console query
        const member = await turso.execute({
            sql: "SELECT user_id, name, email FROM User WHERE user_id in (SELECT user_id FROM Membership WHERE instance_id = (SELECT instance_id FROM Instance WHERE owner_id = ?))",
            args: [id]
        })

        const invites = await turso.execute({
            sql: 'SELECT name, email, sent_on FROM invites WHERE from_user = ?',
            args: [id]
        })

        return NextResponse.json({
            status: 200,
            data: {
                user: user.rows,
                friends: member.rows,
                invites: invites.rows
            }
        })
    }catch(error) {
        return NextResponse.json({
            status: 400,
            message: 'error trying to fetch turso data'
        })
    }

    // get invites sent
}