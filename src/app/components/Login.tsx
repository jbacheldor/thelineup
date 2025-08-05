'use client'

import React, { useEffect, useRef, useState } from "react"
import Lottery from "../components/Lottery"
import WindowFolder from "./Login/WindowFolder"
import PasswordWindow from "./Login/PasswordWindow"

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

const initialLoginForm =  {
            email: '',
            number: '',
            code: '',
            password: '',
        }

type Props = {
    setToken: (name:string, token: string) => void
}

const Login:React.FC<Props> = ({setToken}) => {
    const pathName = process.env.BASE_URL
    const [showLottery, setLottery] = React.useState(false)
    const [loginForm, setLoginForm] = React.useState<loginFormType>(initialLoginForm)
    const [codeSent, setCode] = React.useState(false)
    const [resendCode, setResend] = useState(false)
    const [errorMessage, setMsg] = React.useState("")
    const [loginStyle, setStyle] = React.useState<loginStyleType>({
        code: false,
        password: false,
        email: false,
        sms: false
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [timer, setTimer] = useState(15);
    const id = useRef<NodeJS.Timeout>(null)
    const [validReq, setValidReq] = useState(true)
    const [showLoginWindow, setLoginWindow] = useState("")

    const changeLottery = () => {
        setLottery(!showLottery)
    }

    const changeShowWindow = () => {
        setShowLogin(!showLogin)
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
            setValidReq(true)
        }


        // props need to do switch case login here ya knowww
        if(loginStyle.password == true && validReq){
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
                    setLoginForm(initialLoginForm)

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

    const togglePassword = (e: any) => {
        e.preventDefault();
        setShowPassword(!showPassword)
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

    const setOpenLoginWindow = (value: string) => {
        if(showLoginWindow == value) setLoginWindow("")
        else setLoginWindow(value)
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
            <div id="folders">
                <div id="folder">
                    <img src={"/closed-folder.svg"} onClick={changeLottery}/>
                    <p>lottery</p>
                </div>
                <div id="folder">
                    <img src={"/closed-folder.svg"} onClick={changeShowWindow}/>
                    <p>login</p>
                </div>
            </div>
           {
            showLogin &&
                <WindowFolder closeARoo={changeShowWindow} openLoginWindow={setOpenLoginWindow}/>
           }
           {showLoginWindow == "password" &&
                <div id="lottery-popup" style={{visibility: `${showLoginWindow == "password" ? "visible" : "hidden"}`}}>
                    <PasswordWindow closeWindow={setOpenLoginWindow}/>
                </div>
           }
            <h2>Login</h2>
            {showLottery && 
            <div id="lottery-popup" style={{visibility: `${showLottery ? "visible" : "hidden"}`}}>
                <Lottery changeLottery={changeLottery}/>
            </div>
            }
            <hr/>
            {/* {showLogin &&  */}
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
                            <label>email:  <input className="input-block" value={loginForm.email}  aria-label="email" onChange={(e)=> updateLoginForm(e)}/></label>
                            <label>password:
                                <input className="input-block" value={loginForm.password} type={showPassword ? "password" : "text"} aria-label="password" onChange={(e)=> updateLoginForm(e)}/></label>
                                <button id="eye-button" onClick={(e) => togglePassword(e)}>{showPassword ? "show password?" : "hide password!!!"}</button>
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
            {/* } */}
        
            <style jsx>
            {`
                #folders {
                    position: absolute;
                    left: 10px;
                    top: 40%;
                    text-align: center;
                }
                #folder {
                    margin: 5px;
                    padding: 10px;
                }
                #folder:hover {
                    cursor: pointer;
                }
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