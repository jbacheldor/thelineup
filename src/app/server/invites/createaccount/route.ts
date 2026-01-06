import { NextRequest, NextResponse } from "next/server";
import { createDBClient } from "../../tursoClient";

export async function POST(req: NextRequest){
    const {form, id} = await req.json()

    try {
        const turso = await createDBClient()
        await turso.execute({
            sql: 'INSERT INTO User (user_id, name, email, author, number) Values (?, ?, ?, ?, ?)',
            args: [id, form.name, form.email, form.author, form.number]
        })

        return NextResponse.json({
            message: 'user successfully created',
            status: 200
        })

    }catch(error){
        console.log('error creating new user', error)
        return NextResponse.json({
            error: 'error creating new user',
            status: 400
        })
    }

}