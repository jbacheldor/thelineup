'use client'

import React, { useEffect, useRef, useState } from "react"
import Lottery from "../components/Lottery"
import path from "path"

type loginFormType = {
    email?: string,
    number?: string,
    code: string,
    password: string,
}

type loginStyleType = {
    code: boolean,
    password: boolean,
    email: boolean,
    sms: boolean,
}

const Login:React.FC = () => {
    const pathName = process.env.BASE_URL
    const [showLottery, setLottery] = React.useState(false)
    const [loginForm, setLoginForm] = React.useState<loginFormType>(
        {
            email: '',
            number: '',
            code: '',
            password: '',
        }
    )
    const [codeSent, setCode] = React.useState(false)
    const [resendCode, setResend] = useState(false)
    const [errorMessage, setMsg] = React.useState("")
    const [loginStyle, setStyle] = React.useState<loginStyleType>({
        code: false,
        password: false,
        email: false,
        sms: false
    })
    const [timer, setTimer] = useState(15);
    const id = useRef<NodeJS.Timeout>(null)

    const changeLottery = () => {
        setLottery(!showLottery)
    }

    const forgotPassword = (e: any) => {
        e.preventDefault();
        console.log('ooooh noooo, what ever shall we do')
    }

    const submitLogin = async (e: any) => {
        e.preventDefault()
        console.log(loginForm)

        // props need to do switch case login here ya knowww
        if(loginStyle.password == true){
            await fetch(`${pathName}/server/loginpass`, {
                method: "POST",
                body: JSON.stringify(
                    {
                        "email": loginForm.email,
                        "password": loginForm.password,
                    }
                )
            }).then((response)=> {
                if(!response.ok){
                    setMsg("Password Incorrect :-( ")
                }
                else{
                    console.log("response", response)
                    // encrypted string
                    // also change the name to something random
                    localStorage.setItem('access-level', "wow");
                    // or you can do a token id number
                    // then decrypt that for each
                    localStorage.setItem('session-id', "wow");
                    // expiration date 
                    localStorage.setItem('time-to-live', "wow");
                    localStorage.setItem('token-maybe', "wow");
                    alert('login successful!!')
                    setMsg("")
                }
            }).catch((e)=> {
                setMsg("Error logging in")
                throw new Error('eeee on the client side', e)
            })
        }
    }

    const updateLoginForm = (e: any) => {
        setLoginForm({
            ...loginForm,
            [e.target.ariaLabel]: e.target.value
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
                    "email": false,
                    "sms": false,
                    "password": false,
                    [e.target.value]: !loginStyle[e.target.value as String]
                })
                break;
            case "password":
                setStyle({
                    ...loginStyle,
                    "email": false,
                    "sms": false,
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
            setResend(false)
        }
    }, [timer])

    // 30 second countdown timer 
    const countDownTimer = () => {
        setTimer(timer => timer - 1)
    }

    const onCodeSent = () => {
        setCode(true)
        setResend(true)
        id.current = setInterval(countDownTimer, 1000)
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
                <form onSubmit={e=>submitLogin(e)} id='login-form'>
                    <span>login style:</span>
                    <div id="radio-buttons">
                        <label>
                            <input type="radio" value="code" name="style" onChange={e=>changeStyle(e)}/>
                            <p>code</p>
                            </label>
                    </div>
                    <div id="radio-buttons">
                        <label>
                            <input type="radio" value="password" name="style" onChange={e=>changeStyle(e)}/>
                            <p>password</p>
                        </label>
                    </div>
                    <hr/>
                    
                    
                    {loginStyle.password == true &&
                        <div id="password-style">
                            <span>code style:</span>
                            <label>email:  <input aria-label="email" onChange={(e)=> updateLoginForm(e)}/></label>
                            <label>password: <input aria-label="password" onChange={(e)=> updateLoginForm(e)}/></label>
                            
                        </div>
                    }
                    {loginStyle.code == true &&
                        <div>
                            <span>code style:</span>
                            <div id="radio-buttons">
                                <label>
                                    <input type="radio" name="sms-or-email" value="email" onChange={e=>changeStyle(e)}/>
                                    <p>email</p>
                                </label>
                            </div>
                            <div id="radio-buttons">
                                <label>
                                    <input  type="radio" value="sms" name="sms-or-email" onChange={e=>changeStyle(e)}/>
                                    <p>number</p>
                                </label>
                                
                            </div>
                        </div>
                    }
                    {loginStyle.sms == true && 
                        <div>
                            <label>
                                <p>Please enter your number:</p>
                                <input id="number"/>
                            </label>
                            
                        </div>
                    }
                    {loginStyle.email == true && 
                        <div>
                            <label>
                                <p>Please enter your email:</p>
                                 <input id="email"/>
                            </label>
                        </div>
                    }
                    {loginStyle.code == true && (loginStyle.email == true || loginStyle.sms == true) &&
                        <div>               
                            {codeSent && <span>Timer: {timer} seconds</span>}
                            <button disabled={resendCode} onClick={onCodeSent}>{codeSent ? "Resend Code" : "Send Me a Code!"}</button>
                        </div>}
                    {loginStyle.password == true && 
                        <div id="login-buttons">
                            {errorMessage && 
                                    <span id="error-message">{errorMessage}</span>
                            }
                            <button>Login</button>
                            <button onClick={(e)=> forgotPassword(e)}>Forgot Password</button>
                        </div>
                    }
                </form>
            </div>
            <style jsx>
            {`
                #error-message {
                    color: red;
                    text-align: center;
                    font-weight: 400;
                }
                #password-style {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
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
                #login-buttons {
                    display: flex;
                    flex-direction: column;
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
                    border: 1px black solid;
                    padding: 10px;
                    // flex: 1 1 auto;
                    min-width: 300px;
                    justify-content: center;
                }
                #login-box input {
                    background-color: ;
                }
                #login-box label {
                    display; flex;
                    justify-content: flex-end;
                }
                #radio-buttons input {
                    margin-right: 5px;
                }
                #radio-buttons label {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: left;
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