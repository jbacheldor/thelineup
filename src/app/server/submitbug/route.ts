import { NextResponse } from "next/server";
import { createDBClient } from "../tursoClient";
import { v4 } from "uuid";

export async function POST(req: NextResponse){
    const body = await req.json()

    const id = v4()

    try {
        const turso = await createDBClient()
        await turso.execute({
            sql: 'INSERT INTO bugs (id, severity, type, details, submitted_by) VALUES (?, ?, ?, ?, ?)',
            args: [id, body.severity, body.type, body.details, body.id]
        })

    }catch(error){
        console.log('error in submitting form!', error)
        return NextResponse.json({
            error: 'error in submitting form',
            status: 400
        })
    }

        return NextResponse.json({
            message: 'successfully recorded a bug!',
            status: 200
        })

}