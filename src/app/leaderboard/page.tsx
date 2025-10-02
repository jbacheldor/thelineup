'use client'
import { useLayoutEffect, useState } from "react";
import CrushWrapper from "../components/CrushWrapper"
import { redirect } from "next/navigation";
import { getToken } from "../utils";


const Leaderboard:React.FC = () => {
    const [isVerified, setIsVerified] = useState(false)

    useLayoutEffect(() => {
        const isAuth = getToken('access-token');
        if(!isAuth){
            redirect("/404")
        }
        else setIsVerified(true)
    }, [])

    if(isVerified) return (<CrushWrapper />)
        // i want something better but this is a good inbetween
    else return (
        <>
            we are loading we are thinking
        </>
    )
}

export default Leaderboard