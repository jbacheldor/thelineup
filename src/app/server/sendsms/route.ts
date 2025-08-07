import { getAuth } from "firebase/auth";
import app from "../createClient";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    try {
         const {number, code} = await request.json();
         const auth = getAuth(app);
        //  const res = await 
    }catch(e){

    }
}