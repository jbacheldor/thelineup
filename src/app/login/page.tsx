'use client'

import React, { useEffect, useRef, useState } from "react"
import Lottery from "../components/Lottery"

type loginFormType = {
    email?: string,
    number?: string,
    code: string
}

type loginStyleType = {
    code: boolean,
    password: boolean,
    email: boolean,
    sms: boolean,
}

const Login:React.FC = () => {
    const [showLottery, setLottery] = React.useState(false)
    const [loginForm, setLoginForm] = React.useState<loginFormType>(
        {
            email: '',
            number: '',
            code: ''
        }
    )
    const [codeSent, setCode] = React.useState(false)
    const [errorMessage, setMsg] = React.useState(null)
    const [loginStyle, setStyle] = React.useState<loginStyleType>({
        code: false,
        password: false,
        email: false,
        sms: false
    })
    const [timer, setTimer] = useState(15);
    const id = useRef<NodeJS.Timeout>(null)
    const [intervalId, setIntervalId] = React.useState(null)

    const changeLottery = () => {
        setLottery(!showLottery)
    }

    const submitLogin = (e: any) => {
        e.preventDefault()
        console.log(loginForm)
        // if error
        //  setMsg(error)
    }

    const updateLoginForm = (e: any) => {
        setLoginForm({
            ...loginForm,
            [e.targe.label]: e.target.value
        })
    }

    const changeStyle = (e: any) => {
        console.log('weeee little test', e.target.value)
        switch(e.target.value){
            case "sms":
                setStyle({
                    ...loginStyle,
                    "email": false,
                    [e.target.value]: !loginStyle[e.target.value as String]
                })
                break; 
            case "email":
                setStyle({
                    ...loginStyle,
                    "sms": false,
                    [e.target.value]: !loginStyle[e.target.value as String]
                })
                break;
            case "code":
                setStyle({
                    ...loginStyle,
                    "password": false,
                    [e.target.value]: !loginStyle[e.target.value as String]
                })
                break;
            case "password":
                setStyle({
                    ...loginStyle,
                    "code": false,
                    [e.target.value]: !loginStyle[e.target.value as String]
                })
                break;

        }
    }

    useEffect(()=> {
        if(timer <= 0) {
            if(id.current) clearInterval(id.current);
            setTimer(15)
        }
    }, [timer])

    // 30 second countdown timer 
    const countDownTimer = () => {
        setTimer(timer => timer - 1)
    }

    const onCodeSent = () => {
        setCode(true)
        id.current = setInterval(countDownTimer, 1000)
    }

    return (
        <div id="login-body">
            <h2>Login</h2>
            {errorMessage && 
                <div>{errorMessage}</div>
            }
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
                <form onSubmit={e=>submitLogin(e)} id='login-form'>
                    <span>login style:</span>
                    <div id="radio-buttons">
                        <input type="radio" value="code" name="style" onChange={e=>changeStyle(e)}/>
                        <label>code</label>
                    </div>
                    <div id="radio-buttons">
                        <input type="radio" value="password" name="style" onChange={e=>changeStyle(e)}/>
                        <label>password</label>
                    </div>
                    <hr/>
                    
                    
                    {loginStyle.password == true &&
                        <div id="password-style">
                            <span>code style:</span>
                            <label>username: </label>
                            <input/>
                            <label>password: </label>
                            <input/>
                        </div>
                    }
                    {loginStyle.code == true &&
                        <div>
                            <span>code style:</span>
                            <div id="radio-buttons">
                                <span>Email</span>
                                <input type="radio" name="sms-or-email" value="email" onChange={e=>changeStyle(e)}/>
                            </div>
                            <div id="radio-buttons">
                                <span>Number:</span>
                                <input  type="radio" value="sms" name="sms-or-email" onChange={e=>changeStyle(e)}/>
                            </div>
                        </div>
                    }
                    {loginStyle.sms == true && 
                        <div>
                            <label>Please enter your number:</label>
                            <input id="number"/>
                        </div>
                    }
                    {loginStyle.email == true && 
                        <div>
                            <label>Please enter your email:</label>
                            <input id="email"/>
                        </div>
                    }
                    {/* countdowntimer here */}
                    <span>Timer: {timer} seconds</span>
                    <button onClick={onCodeSent}>{codeSent ? "Resend Code" : "Send Me a Code!"}</button>
                </form>
            </div>
            <style jsx>
            {`
                #password-style {
                    display: flex;
                    flex-direction: column;
                }
                #radio-buttons {
                    display: flex;
                    flex-direction: row;
                    text-align: center;
                }
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
                label {
                    margin-left: 10px;
                }
                hr {
                    width: 30%;
                    margin: 10px;
                }
                #login-box {
                    display: flex;
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