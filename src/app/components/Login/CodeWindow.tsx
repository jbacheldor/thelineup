import { useEffect, useState } from "react";
import Timer from "../Timer";
import WindowWrapper from "./WindowWrapper";

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
    const [codeSent, setCodeSent] = useState<string>('');
    const [isLoginValid, setLoginValid] = useState(false);

    const setWindow = () => {
        closeWindow("code")
    }

    const submitLogin =  async (e: any) => {
        e.preventDefault();

        
        const data = await fetch(`${pathName}/server/login${type}`)
    }

    const checkForNums = () => {
        let pattern = /\d/g;
        if((loginForm.sms)) {
            let charCount = (loginForm.sms).replace(pattern, '').length; 
            if(charCount > 0) return false
            else return true
        }
    }

    useEffect(()=> {
        // only applies if type is sms 
        if(type == 'sms') {
            if(loginForm.sms?.length !== 9 || checkForNums()) {
                setisvalid(false)
            }
            else setisvalid(true)
        }
        else {
            if(loginForm.email == "" || !loginForm.email?.includes("@")) {
                setisvalid(false)
            }
            else setisvalid(true)
        }

    }, [loginForm])

    const sendCode = async () => {
        if(isvalid){

            const res = await fetch(`${pathName}/server/send${type}`)
            .then((data) => {
                if(data.status == 200) {
                    setCodeSent('')
                }
            })
        }
    }

    return (
        <WindowWrapper onClose={setWindow} name="Code Login">
            <div>
                 <form onSubmit={e=>submitLogin(e)}>
                    <label>
                        <p>{type}:</p>
                        <input id={type}></input>
                    </label>
                    {!codeSent &&
                        <label>
                            <p>code:</p>
                            <input id="code"></input>
                        </label>
                    }
                    <div id="bottom-half">
                            {errorMsg && 
                            <p>{errorMsg}</p>
                        }
                        <Timer time={30} initialString="Send Code" secondString="Resend Code" onClick={sendCode} disabled={true}/>
                    </div>
                 </form>
            
            <style jsx>
                {`
                    form {
                        background-color: white;
                        padding: 15px;
                    }
                    #bottom-half {
                        display: flex;
                        justify-content: center;
                    }
                `}
            </style>
            </div>
            </WindowWrapper>
    )
}

export default CodeWindow;