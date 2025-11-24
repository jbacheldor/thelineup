import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import WindowWrapper from "./WindowWrapper";
import Timer from "../Timer";
import CloseButton from "../General/CloseButton";
import { redirect } from "next/navigation";
import { passLogin } from "@/app/authUtils";



type loginFormType = {
    email: string,
    password: string,
}

const initialLoginForm = {
    email: '',
    password: ''
}

type Props = {
    closeWindow: (value: string) => void
}

const PasswordWindow:React.FC<Props> = ({closeWindow}) => {
    const pathName = process.env.BASE_URL
    const [showPassword, setShowPassword] = useState(false);
    const [loginForm, setLoginForm] = useState<loginFormType>(initialLoginForm)
    const [errorMessage, setMsg] = useState("")
    const [validReq, setValidReq] = useState(true)
    const [resetBtn, setReset] = useState(false);

    const setClose = () => {
        closeWindow("password")
    }

    const forgotPassword = async () => {

        await fetch(`${pathName}/server/forgotpassword`, {
            method: "POST", 
            body: JSON.stringify({
                'email': loginForm.email
            })
        }).then(async (res)=> {

            if(res.status == 200){
                console.log('yipeee password reset link sent!!')
                setReset(!resetBtn)
            }

        })

    }

    useEffect(()=> {
        if(loginForm.email == "" || !loginForm.email?.includes("@")) {
            setReset(true)
        }
        else {
            setReset(false)
        }
    }, [loginForm.email])

    const togglePassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    const updateLoginForm = (e: ChangeEvent) => {
        if(e.target){
            setLoginForm({
                ...loginForm,
                [(e.target as HTMLInputElement).ariaLabel || '']: (e.target as HTMLInputElement).value
            })
        }
    }

    const submitLogin = async (e: FormEvent) => {
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
        if(validReq){
                await passLogin(loginForm.email, loginForm.password)
                .then((res)=> {
                    if(res.status == 400){
                        setMsg("Invalid Credentials, try again")
                    }
                    else if(res.status == 200) {
                        setLoginForm(initialLoginForm)
                        
                        setMsg("")
                        closeWindow("password")
                        
                    }
                    
                }).catch((error)=>{
                    setMsg("Error logging in")
                    console.log('caught an error in password window', error)
                    throw new Error('eeee on the client side', error)
                }).finally(()=> {
                    redirect("/leaderboard")
                })
             }
    }

    return (
        <WindowWrapper onClose={setClose} name="Password Login">
            <div>
            <form onSubmit={e=>submitLogin(e)}>
                <div id="password-style">
                    <label>email:  <input className="input-block" value={loginForm.email}  aria-label="email" onChange={(e)=> updateLoginForm(e)}/></label>
                    <label>
                        <p>password:  
                            <button onClick={(e) => togglePassword(e)}>
                                {showPassword ? 
                                "show password": 
                                "hide password"
                                // <img alt="hide password button" src={'./hidden.svg'} width="15px" height="15px"/>
                                }
                            </button>
                            </p>
                        <input className="input-block" value={loginForm.password} type={showPassword ? "password" : "text"} aria-label="password" onChange={(e)=> updateLoginForm(e)}/></label>
                </div>
                    {errorMessage && 
                            <span id="error-message">{errorMessage}</span>
                    }
                <div id="login-buttons">
                    
                    <CloseButton type="other" text="Login"/>
                    {/* <button>
                        <div id="button-inside">
                            Login
                        </div>    
                        </button> */}
                    <Timer time={30} initialString="Forgot Password" secondString="Resend Link" disabled={resetBtn} onClick={()=> forgotPassword()}/>
                </div>
            </form>

                        <style jsx >
                {`
               #error-message {
                    color: red;
                    text-align: center;
                    font-weight: 400;
                    display: block;
                }
                .input-block {
                    width: 100%;
                }
                #password-style {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }
                #login-buttons {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;
                    width: 100%;
                }
                #button-inside {
                    border: 1px dotted grey;
                }
                form {
                    background-color: #E9FFFD;
                    padding: 15px;
                    width: 300px;
                }
                button:hover {
                    cursor: pointer;
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
                span {
                    margin: 5px;
                }
                button {
                    margin: 10px 0;
                    align-self: center;
                    border-top: 2px solid  #7DF9FF;
                    border-left:2px solid #7DF9FF;
                    border-bottom:2px solid  #A899E6;
                    border-right:2px solid  #A899E6;
                    padding: 5px;
                }
                input {
                    background-color: #FAFAFA;
                    border-top: 2px solid  #7DF9FF;
                    border-left: 2px solid #7DF9FF;
                    border-bottom: 2px solid  #A899E6;
                    border-right: 2px solid  #A899E6;
                    padding: 2px 5px;
                }
            `}
            </style>
            </div>  
            </WindowWrapper>
    )
}

export default PasswordWindow;