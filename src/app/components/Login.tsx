'use client'
import { useState } from "react"
import Lottery from "../components/Lottery"
import WindowFolder from "./Login/WindowFolder"
import Folder from "./General/Folder"

const Login:React.FC = () => {
    const [showLottery, setLottery] = useState(false)
    const [showLogin, setShowLogin] = useState(false);

    const changeLottery = () => {
        setLottery(!showLottery)
        setShowLogin(false)
    }

    const changeShowWindow = () => {
        setShowLogin(!showLogin)
        setLottery(false)
    }

    return (
        <>
        <div id="login-body"
        style={{
            'display': 'flex',
            'alignItems': 'center',
            'flexDirection': 'column',
            'height': '100%',
        }}
        >

            <h2 style={{'margin': '20px'}}>Login</h2>
            <div id="folders" style={{
                'position': 'absolute',
                'left': '10px',
                'top': '40%',
                'textAlign': 'center'
            }}>
                <Folder onClickEvent={changeLottery} text="lottery"/>
                <Folder onClickEvent={changeShowWindow} text="login"/>
            </div>
           {
            showLogin &&
                <WindowFolder closeARoo={changeShowWindow}/>
           }
            {showLottery && 
                <Lottery changeLottery={changeLottery}/>
            }
        

        </div>
        </>
    )
}

export default Login