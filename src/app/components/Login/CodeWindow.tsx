import { useEffect, useState } from "react";
import Timer from "../Timer";
import WindowWrapper from "./WindowWrapper";
import CloseButton from "../General/CloseButton";

type Props = {
    type: string,
    closeWindow: (value: string) => void;
}

type loginForm = {
    email?: string,
    sms?: string,
    code: string
}

const CodeWindow:React.FC<Props> = ({type, closeWindow}) => {
    const pathName = process.env.BASE_URL
    const [errorMsg, setMsg] = useState("")
    const [loginForm, setLoginForm] = useState<loginForm>({
        [type]: '',
        code: '', 
    })
    const [isvalid, setisvalid] = useState(false)
    const [codeSent, setCodeSent] = useState(false);
    const [isLoginValid, setLoginValid] = useState(false);

    const setWindow = () => {
        closeWindow("code")
    }

    const submitLogin =  async (e: any) => {
        e.preventDefault();

    }

    // returns false if there are any characters that are not numbers!!
    // including alphanumerics and symbols
    const checkForNums = () => {
        let pattern = /\d/g;
        if((loginForm.sms)) {
            let charCount = (loginForm.sms).replace(pattern, '').length; 
            console.log('char count', charCount)
            if(charCount > 0) return false
            else return true
        }
    }

    useEffect(()=> {
        if(type == 'sms') {
            if(loginForm.sms?.length == 10 && checkForNums()) {
                setisvalid(true)
            }
            else setisvalid(false)
        }
        else {
            console.log('loginForm.email == "" ', loginForm.email == "" )
            if(loginForm.email == "" || !loginForm.email?.includes("@")) {
                setisvalid(false)
            }
            else setisvalid(true)
        }

        // if code has bene sent and sms / email is valid,,, then put code in
        if(isvalid && codeSent){
            // maybe we need to check length of code,,, 
            setLoginValid
        }

    }, [loginForm])

    const sendLink = async () => {
        if(isvalid){
            setCodeSent(true)

            await fetch(`${pathName}/server/sendemaillink`, {
                method: 'POST',
                body: JSON.stringify({
                    'email': loginForm.email
                })
            })
            .then(async (data) => {
                const res = await data.json()
                if(data.status == 200) {
                    setCodeSent(false)
                }
                console.log(res)
            })
        }
    }

    const sendCode = async () => {
        if(isvalid){
            setCodeSent(true)

            await fetch(`${pathName}/server/send${type}`, {
                method: 'POST',
                body: JSON.stringify({
                    'email': loginForm.email
                })
            })
            .then(async (data) => {
                const res = await data.json()
                if(data.status == 200) {
                    setCodeSent(false)
                }
                console.log(res)
            })
        }
    }

    const updateLoginForm = (e: any) => {
        setLoginForm({
            ...loginForm,
            [e.target.ariaLabel]: e.target.value
        })
    }

    console.log('type ?????', type)

    return (
        <WindowWrapper onClose={setWindow} name="Code Login">
            <div id="code-form">
                 <form onSubmit={e=>submitLogin(e)}>
                    {type == 'sms' &&
                        <label>
                            <p>{type}:</p>
                            <input id="sms"  maxLength={10} aria-label="sms" value={loginForm.sms} onChange={(e)=>updateLoginForm(e)}></input>
                    </label>
                    }
                    {type == 'email' &&
                        <div id="email">
                            <label>
                                <p>{type}:</p>
                                <input id="email" aria-label="email" value={loginForm.email} onChange={(e)=>updateLoginForm(e)}></input>
                            </label>
                            <Timer time={30} initialString="Send Link" secondString="Resend Link" onClick={sendLink} disabled={!isvalid}/>
                        </div>
                    }
                        {type == 'sms' &&
                        <div id={`bottom-half`}>
                            {codeSent &&
                                <label>
                                <p>code:</p>
                                <input id="code" aria-label="code" value={loginForm.code} onChange={(e)=>updateLoginForm(e)}></input>
                            </label>
                            }
                                {errorMsg && <p>{errorMsg}</p>}
                            <div id="login-buttons">
                                <CloseButton type="other" text="Login" disabled={!isLoginValid}/>
                                <Timer time={30} initialString="Send Code" secondString="Resend Code" onClick={sendCode} disabled={!isvalid}/>
                            </div>
                        
                        </div>
                    }

                 </form>
            
            <style jsx>
                {`
                    #code-form {
                        width: 100%;
                    }
                    form {
                        background-color: white;
                        padding: 15px;
                    }
                    bottom-half {
                        display: flex;
                        justify-content: center;
                    }
                    #login-buttons {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-evenly;
                        width: 100%;
                        margin: 10px 0;
                    }
                    div #email {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                `}
            </style>
            </div>
            </WindowWrapper>
    )
}

export default CodeWindow;