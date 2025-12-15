import { createDBClient } from "@/app/tursoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const id = await req.nextUrl.searchParams.get('id')

    try {
        if(!id) throw new Error('no id found!') 
        // const turso = createDBClient()
        // const user = await turso.execute({
        //     sql: "SELECT * FROM User JOIN Instance ON User.user_id = owner_id WHERE owner_id = ?",
        //     args: [id],
        // });

        // return NextResponse.json({
        //     status: 200,
        //     data: user.rows[0],
        // })
    }catch(error){
        console.log('error in getting user information', error)
        return NextResponse.json({
            status: 400, 
            message: 'Error in getting user information'
        })
    }
}