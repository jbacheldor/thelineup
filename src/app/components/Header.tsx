'use client'
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import DropDown from "./Notifications/DropDown";
import { AuthContext } from "../context";
import Image from "next/image";


const Header:React.FC = () => {
    const [alerts, setAlerts] = useState(true)
    const [showNotifications, setNotifs] = useState(false)
    const { isAuthenticated, logout } = useContext(AuthContext)


    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(e.target){
            const value = (e.target as HTMLButtonElement).innerHTML
            if(value == "home"){
                redirect("/")
            }
            else redirect(`/${value}`)
            }
    }

    const changeAlert = () => {
        setAlerts(!alerts)
        setNotifs(!showNotifications)
    }

    return (
        <div id="header" style={{
                    "display": "flex",
                        "justifyContent": "space-between",
                        "alignItems": "center",
                        "margin": "5px",
                        "width": "100%",}}>
                <div id="links">
                    <button style={{"background": "radial-gradient(circle,rgba(0, 0, 0, 1) 0%, rgba(245, 233, 191, 1) 0%, rgba(232, 197, 70, 1) 99%)",
        "borderStartStartRadius": "50px 100px",
        "borderStartEndRadius": "50px 100px",
        "padding": "7px 15px",
        "textAlign": "center",
        "border": "none",
        "borderRight": "1px solid pink",
        "boxShadow": "4px 4px 10px grey"}} className="nav-button" onClick={(e)=> onClick(e)}>home</button>
                    {isAuthenticated.isAuth && 
                        <button style={{"background": "radial-gradient(circle,rgba(0, 0, 0, 1) 0%, rgba(245, 233, 191, 1) 0%, rgba(232, 197, 70, 1) 99%)",
        "borderStartStartRadius": "50px 100px",
        "borderStartEndRadius": "50px 100px",
        "padding": "7px 15px",
        "textAlign": "center",
        "border": "none",
        "borderRight": "1px solid pink",
        "boxShadow": "4px 4px 10px grey"}} className="nav-button" onClick={(e)=> onClick(e)}>leaderboard</button>
                    }
                    {isAuthenticated.isAuth && 
                        <button style={{"background": "radial-gradient(circle,rgba(0, 0, 0, 1) 0%, rgba(245, 233, 191, 1) 0%, rgba(232, 197, 70, 1) 99%)",
        "borderStartStartRadius": "50px 100px",
        "borderStartEndRadius": "50px 100px",
        "padding": "7px 15px",
        "textAlign": "center",
        "border": "none",
        "borderRight": "1px solid pink",
        "boxShadow": "4px 4px 10px grey"}} className="nav-button" onClick={(e)=> onClick(e)}>activity</button>
                    }
                    
                    {/* need one for like my leaderboard and then for others */}
                </div>
                                    <button id='notif-button' onClick={()=>redirect("/bugreport")}>
                        <Image width={20} height={20} alt="bug icon" id="report-bugs" src={'/bug.png'}/>
                    </button>
                {isAuthenticated.isAuth && 
                <div id='auth-info'>
                    <p>Logged in as: {isAuthenticated.name}</p>
                    <button id='notif-button' onClick={changeAlert}>
                        <Image width={20} height={20} alt="alert notification button" id="notifications" src={alerts ? "/alert-bell.svg" : "/bell.svg"}/> 
                        </button>
                    <button id='notif-button'>
                        <Image  width={20} height={20}  alt="setting button" id="notifications" src={"/settings.png"} onClick={()=> {redirect('/settings')}}/> 
                        </button>
                    <button id='logout-button' onClick={()=>logout()}>logout</button>
                    {showNotifications && <DropDown/>}
                </div>
                }

            <style jsx>
                {`
                    #logout-button {
                        background:none;
                        border: none;
                        margin-right: 15px;
                    }
                    #notifications:hover {
                        cursor: pointer;
                    }
                    #notif-button {
                        background:none;
                        border: none;
                    }
                    button.nav-button:hover {
                        cursor: pointer;
                    }
                    div#auth-info {
                        display: flex;
                    }
                    #auth-info > p {
                        margin-right: 7px;
                    }
                    img#notifications {
                        width: 22px;
                        height: 22px;
                        margin-right: 8px;
                    }   
                `}
            </style>
        </div>
    )
}

export default Header;