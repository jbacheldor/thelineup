import { FriendType } from "@/app/components/Settings/Friends";
import { createDBClient } from "@/app/tursoClient";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest) {
    let val: string = ''
    const {id, instance_id} = await req.json()

    id.forEach((obj: FriendType, index: number) => 
       { 
        if(id.length == 1) val = obj.user_id
        else if (index == id.length - 1) val = val + `${obj.user_id}`
        else val = val + `${obj.user_id},  `
       }
    )
    
    console.log('values', val)

    try {
        const turso = createDBClient()
        
        turso.execute({
            sql: 'DELETE FROM Membership WHERE (instance_id is ? AND user_id in (?))',
            args: [instance_id, val]
        })

        return NextResponse.json({
            message: 'successfully removed friend',
            status: '200'
        })
    }catch(error){
        console.log('error deleting resource: ', error)
        return NextResponse.json({
            message: 'error deleting record',
            status: 400
        })
    }
}