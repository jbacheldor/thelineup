import { turso } from "@/app/tursoClient";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest){

    const {id} =  await req.json()

    try {
        if(id){
            await turso.execute({
                sql: `UPDATE invites SET status = 'cancelled' WHERE uuid = ?`,
                args: [id]
            })

            
            return NextResponse.json({
                message: 'Invite successfully cancelled',
                status: '200'
            })
        }else {
            throw new Error('no id located how sad')
        }
    } catch(error){
        console.log('error in updating record in turso: ', error)
        return NextResponse.json({
            status: 400,
            message: 'Could not update invite status'
        })
    }
}