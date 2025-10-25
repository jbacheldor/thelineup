'use client'
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import DropDown from "./Notifications/DropDown";
import { AuthContext } from "../context";


const Header:React.FC = () => {
    const [alerts, setAlerts] = useState(true)
    const [showNotifications, setNotifs] = useState(false)
    const { isAuthenticated, logout } = useContext(AuthContext)


    const onClick = (e: any) => {
        console.log(e)
        if(e.target.innerHTML == "home"){
            redirect("/")
        }
        else redirect(`/${e.target.innerHTML}`)
    }

    const changeAlert = () => {
        setAlerts(!alerts)
        setNotifs(!showNotifications)
    }

    return (
        <div id="header">
                <div id="links">
                    <button className="nav-button" onClick={(e)=> onClick(e)}>home</button>
                    {isAuthenticated.isAuth && 
                        <button className="nav-button" onClick={(e)=> onClick(e)}>leaderboard</button>
                    }
                    
                    {/* need one for like my leaderboard and then for others */}
                </div>
                {isAuthenticated.isAuth && 
                <div id='auth-info'>
                    <p>Logged in as: {isAuthenticated.name}</p>
                    <button id='notif-button' onClick={changeAlert}><img id="notifications" src={alerts ? "/alert-bell.svg" : "/bell.svg"}/></button>
                    <button id='notif-button' ><img id="notifications" src={"settings.png"}/></button>
                    <button id='logout-button' onClick={()=>logout()}>logout</button>
                    {showNotifications && <DropDown/>}
                </div>
                }

            <style jsx>
                {`
                    #header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin: 5px;
                        width: 100%;
                    }
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
                    button.nav-button {
                        background: #FFFFFF;
                        background: radial-gradient(circle,rgba(0, 0, 0, 1) 0%, rgba(245, 233, 191, 1) 0%, rgba(232, 197, 70, 1) 99%);
                        border-start-start-radius: 50px 100px;
                        border-start-end-radius: 50px 100px;
                        padding: 7px 15px;
                        text-align: center;
                        border: none;
                        border-right: 1px solid pink;
                        box-shadow: 4px 4px 10px grey;
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