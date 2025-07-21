import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
    try {
        // call the client
        // const { error, data} = await client

        // parse data into sections
        // we have current and graveyard
        return NextResponse.json({})
    }
    catch(e){
        return NextResponse.json(
            {error: 'error in retrieving data from server'},
            {status: 400}
        )
    }
}