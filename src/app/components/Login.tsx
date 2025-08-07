'use client'
import { useState } from "react"
import Lottery from "../components/Lottery"
import WindowFolder from "./Login/WindowFolder"
import Folder from "./General/Folder"

type Props = {
    setToken: (name:string, token: string) => void
}

const Login:React.FC<Props> = ({setToken}) => {
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
        <div id="login-body">
            <h2>Login</h2>
            <div id="folders">
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
        
            <style jsx>
            {`
                #folders {
                    position: absolute;
                    left: 10px;
                    top: 40%;
                    text-align: center;
                }
                #login-body {
                    display: flex;
                    align-items: center;
                    flex-direction: column; 
                    height: 100%;
                }
                h2 {
                    margin: 20px;   
                }
            
            `}
            </style>
        </div>
    )
}

export default Login