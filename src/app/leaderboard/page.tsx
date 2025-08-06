'use client'
import { useLayoutEffect } from "react";
import CrushWrapper from "../components/CrushWrapper"
import { getToken } from "../page";
import { redirect } from "next/navigation";


const Leaderboard:React.FC = () => {

    useLayoutEffect(() => {
        const isAuth = getToken('access-token');
        if(!isAuth){
            redirect("/404")
        }
    }, [])

    return (
        <CrushWrapper />
    )
}

export default Leaderboard