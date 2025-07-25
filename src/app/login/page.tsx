'use client'

import React from "react"
import Lottery from "../components/Lottery"

const Login:React.FC = () => {
    const [showLottery, setLottery] = React.useState(false)
    const [visibility, setVisibility] = React.useState<DocumentVisibilityState>("hidden")

    const changeLottery = () => {
        setLottery(!showLottery)
        if(!showLottery) setVisibility("visible")
        else setVisibility("hidden")
    }

    return (
        <div id="login-body">
            <h3>Login</h3>
            {/* need to check local storage low key */}
            <div id="lottery">
                Apply for Lottery?
                {!showLottery && <button onClick={changeLottery}>yes</button>}
                {showLottery && 
                <div id="lottery-popup" style={{visibility: `${visibility}`}}>
                    <Lottery changeLottery={changeLottery}/>
                </div>
                }
            </div>
            <div id='login-box'>
                <form id='login-form'>
                    <span>Number:</span>
                    <input id="number"></input>
                    <span></span>
                    <input></input>
                    <button>let's gooooo</button>
                </form>
            </div>
            <style jsx>
            {`
                #login-body {
                    display: flex;
                    align-items: center;
                    flex-direction: column; 
                    height: 100%;
                }
                #lottery-popup {
                    position: absolute;
                    z-index: 1;
                    hidden: true;
                }
                #login-form {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    justify-content: center;
                }
                #login-box {
                    display: flex;
                    flex: 1 1 auto;
                }
                #lottery-form {
                    display: flex;
                    flex-direction: column;
                    border: 1px black solid;
                    border-radius: 5px;
                    padding: 10px;
                }
                h3 {
                    margin: 10px;    
                }
                span {
                    margin: 5px;
                }
                button {
                    margin: 5px;
                }
                #lottery {
                    margin: 10px;
                }
            
            `}
            </style>
        </div>
    )
}

export default Login