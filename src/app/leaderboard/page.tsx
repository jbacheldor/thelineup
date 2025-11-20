'use client'
import { useContext, useLayoutEffect, useState } from "react";
import CrushWrapper from "../components/CrushWrapper"
import { redirect } from "next/navigation";
import isAuth from "../Auth";
import { AuthContext } from "../context";


const Leaderboard:React.FC = () => {
    const pathName = process.env.BASE_URL
    const [isVerified, setIsVerified] = useState(false)
    const { isAuthenticated } = useContext(AuthContext);

    // if we are using wrapper idt we need this, but what do i know
    useLayoutEffect(() => {
        if(!isAuthenticated.isAuth){
            // silentRefresh()
            redirect("/404")
        }
        else {
            setIsVerified(true)
            // silentRefresh()
        }
    }, [])


    if(isVerified) return (<CrushWrapper />)
        // i want something better but this is a good inbetween
    else return (
        <>
            we are loading we are thinking
        </>
    )
}

export default isAuth(Leaderboard);