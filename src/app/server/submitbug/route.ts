import { NextResponse } from "next/server";
import { createDBClient } from "../tursoClient";

type form = {
    severity: string,
    type: string,
    details: string,
    id?: string,
    attachments?: [],
}

export async function POST(req: NextResponse){
    const { form } = await req.json()

    try {
        const turso = await createDBClient()
        turso.execute({
            sql: '',
            args: []
        })
        

    }catch(error){
        console.log('error in submitting form!')
        return NextResponse.json({
            error: 'error in submitting form',
            status: 400
        })
    }

}