import { NextResponse } from "next/server";


export async function GET(){
    console.log('are we in here????? in the get crushes situation')
    try {
        // call the client
        // const { error, data} = await client

        // parse data into sections
        // we have current and graveyard
        return NextResponse.json({})
    }
    catch(e){
        console.log('hoy minoyyyy an error', e)
        return NextResponse.json(
            {error: 'error in retrieving data from server'},
            {status: 400}
        )
    }
}