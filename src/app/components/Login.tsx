'use client'

import React, { useEffect, useRef, useState } from "react"
import Lottery from "../components/Lottery"

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

type Props = {
    setToken: (name:string, token: string) => void
}

const Login:React.FC<Props> = ({setToken}) => {
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
    const [validReq, setValidReq] = useState(true)

    const changeLottery = () => {
        setLottery(!showLottery)
    }

    const forgotPassword = (e: any) => {
        e.preventDefault();
        console.log('ooooh noooo, what ever shall we do')
    }

    const submitLogin = async (e: any) => {
        e.preventDefault()

        // error handling
        // should probably put in cross-site scripting protection as well 
        if(loginForm.email == "" || !loginForm.email?.includes("@")) {
            console.log("email invalid")
            setMsg("Invalid Email")
            setValidReq(false)
            return;
        }
        else if(loginForm.password == "") {
            console.log("password invalid")
            setMsg("Please enter proper password")
            setValidReq(false)
            return;
        }
        else {
            console.log("????")
            setValidReq(true)
        }

        console.log("what is this", validReq)

        // props need to do switch case login here ya knowww
        if(loginStyle.password == true && validReq){
            console.log('why are we in here')
            await fetch(`${pathName}/server/loginpass`, {
                method: "POST",
                body: JSON.stringify(
                    {
                        "email": loginForm.email,
                        "password": loginForm.password,
                    }
                )
            }).then(async (response)=> {
                if(!response.ok){
                    setMsg("Invalid Credentials, try again")
                }
                else{
                    const data = await response.json()
                    const {accessToken, refreshToken} = data.body.user

                    // encrypted string
                    // also change the name to something random
                    localStorage.setItem('access-token', accessToken)
                    localStorage.setItem('refresh-token', refreshToken)
                    localStorage.setItem('time-to-live', "7")

                    // localStorage.setItem('session-id', "wow");

                    alert('login successful!!')
                    setMsg("")
                    // setToken("woah!")
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
                    <div id="login-style">
                        <h3>login style:</h3>
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
                    </div>
                    <hr/>
                    
                    
                    {loginStyle.password == true &&
                        <div id="password-style">
                            <h3>code style:</h3>
                            <label>email:  <input className="input-block" aria-label="email" onChange={(e)=> updateLoginForm(e)}/></label>
                            <label>password: <input className="input-block" aria-label="password" onChange={(e)=> updateLoginForm(e)}/></label>
                            
                        </div>
                    }
                    {loginStyle.code == true &&
                        <div>
                            <h3>code style:</h3>
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
                    <hr/>
                    {loginStyle.sms == true && 
                        <div className="entry">
                            <label>
                                <p>Please enter your number:</p>
                                <input className="input-block" id="number"/>
                            </label>
                        </div>
                    }
                    {loginStyle.email == true && 
                        <div className="entry">
                            <label>
                                <p>Please enter your email:</p>
                                 <input className="input-block" id="email"/>
                            </label>
                        </div>
                    }
                    {loginStyle.code == true && (loginStyle.email == true || loginStyle.sms == true) &&
                        <div id="code-buttons">               
                            <span>{codeSent && <span>Timer: {timer} seconds</span>}
                            <button disabled={resendCode} onClick={onCodeSent}>{codeSent ? "Resend Code" : "Send Me a Code!"}</button>
                            </span>
                            <button onClick={(e)=> e.preventDefault()}>Login</button>
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
                .input-block {
                    width: 100%;
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
                    width: 100%;
                    align-items: center;
                }
                #code-buttons {
                    display: flex;
                    flex-direction: column;
                }
                .entry {
                    width: 70%;
                }
                .entry p {
                    margin: 5px 0;
                    text-align: center;
                }
                .entry input {
                    margin: 5px 0;
                }
                label {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                }
                hr {
                    width: 30%;
                    margin: 10px;
                }
                #login-box {
                    display: flex;
                    border: 1px black solid;
                    padding: 10px;
                    min-width: 300px;
                    justify-content: center;
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
                h3 {
                    text-align: center;
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