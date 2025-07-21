import { NextRequest } from "next/server";


export async function GET(request: NextRequest){
    try {
        const id = request.nextUrl.searchParams.get('id')

        // call client
        // make call & request all info

    } catch(e){

    }
}