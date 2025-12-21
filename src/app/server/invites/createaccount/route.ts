import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import { createDBClient } from "../../tursoClient";

export async function POST(req: NextRequest){
    const {form} = await req.json()

    try {
        const id = v4()
        const turso = await createDBClient()
        turso.execute({
            sql: 'INSERT INTO Users user_id, name, email, author, number Values (?, ?, ?, ?, ?)',
            args: [id, form.name, form.email, form.author, form.number]
        })

    }catch(error){
        console.log('error creating new user', error)
        return NextResponse.json({
            error: 'error creating new user',
            status: 400
        })
    }

}