import { turso } from "@/app/tursoClient";
import { NextRequest } from "next/server";

type user = {
    user_id: string,
    name: string,
    email: string,
    author: boolean,
    numer: string,
}

export async function GET(req: NextRequest) {
    
    // fetch from server

    // get contact info
    const user = await turso.execute({
        sql: "SELECT * FROM User WHERE user_id = ?",
        args: [1],
    });

    console.log('what is user', user)

    // get membership

    // this works within sql console query
    const member = await turso.execute({
        sql: "SELECT user_id, name, email FROM User WHERE user_id in (SELECT user_id FROM Membership WHERE instance_id = (SELECT instance_id FROM Instance WHERE owner_id = '?'))",
        args: [1]
    })

    console.log('what is member', member)

    const invites = await turso.execute({
        sql: 'SELECT name, email, sent_on FROM invites WHERE from_user = ?',
        args: [1]
    })

    console.log('what is invites', invites)

    // get invites sent
}