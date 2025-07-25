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
            <h2>Login</h2>
            {/* need to check local storage low key */}
            Apply for Lottery?
            <button style={{visibility: `${showLottery ? "hidden" : "visible"}`}} onClick={changeLottery}>yes</button>
            {showLottery && 
            <div id="lottery-popup" style={{visibility: `${showLottery ? "visible" : "hidden"}`}}>
                <Lottery changeLottery={changeLottery}/>
            </div>
            }
            <hr/>
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
                    hidden: true;
                    top: 20%;
                }
                #login-form {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    justify-content: center;
                }
                hr {
                    width: 30%;
                    margin: 10px;
                }
                #login-box {
                    display: flex;
                    margin-top: 20px;
                    // flex: 1 1 auto;
                }
                #lottery-form {
                    display: flex;
                    flex-direction: column;
                    border: 1px black solid;
                    border-radius: 5px;
                    padding: 10px;
                }
                h2 {
                    margin: 20px;   
                }
                span {
                    margin: 5px;
                }
                button {
                    margin: 5px;
                }
            
            `}
            </style>
        </div>
    )
}

export default Login