import { useEffect, useState } from "react";
import WindowWrapper from "./Login/WindowWrapper";
import RetroButton from "./CloseButton";
import CloseButton from "./CloseButton";

type props = {
    changeLottery: () => void;
}

const Lottery:React.FC<props> = ({changeLottery}) => {
    const [terms, setTerms] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        number: '',
        consent: false
    });
    const [submitOption, setSubmit] = useState(false);

    const submitLottery = (e: any) => {
        e.preventDefault()
    }  

    const openTC = () => {
        setTerms(!terms)
    }

    const onChange = (e: any) => {
        if(e.target.ariaLabel == 'consent'){
            setForm({
                ...form,
                [e.target.ariaLabel]: e.target.checked
            })
        }
        else {
            setForm({
                ...form,
                [e.target.ariaLabel]: e.target.value
            })
        }
    }

    useEffect(()=> {
        isValid()
    }, [form])

    // checks to see is form submission should be disabled or not 
    const isValid = () => {
        if(form.name == ""){
            setSubmit(false)
        }
        else if(form.email == "" || !form.email?.includes("@")){
            setSubmit(false)
        }
        else if(form.number == "" || form.number.length < 10) {
            setSubmit(false)
        }
        else if(!form.consent){
            setSubmit(false)
        }
        else {
            setSubmit(true)
        }
    }

    return (
        <div>
            <WindowWrapper onClose={changeLottery} name="Lottery">
                    <form id='lottery-form' onSubmit={(e)=>submitLottery(e)} onChange={(e)=> onChange(e)}>
                        <span>name*</span>
                        <input aria-label="name" required placeholder="your name"/>
                        <span>number*</span>
                        <input aria-label="number"  maxLength={10} required placeholder="your number"/>
                        <span>email*</span>
                        <input aria-label="email"  required placeholder="your email"/>
                        <label id="consent">
                            <input type="checkbox" aria-label="consent"/>
                            <p>I read & agree to the <a onClick={openTC}>terms and conditions</a></p>
                        </label>
                        {terms && 
                            <div id="tc">
                                Submitting this doesn't entail that you will get access. It does, however, show that you think I'm really really cool. Thanks for taking an interest in my passions!!
                            </div>
                            }
                        <CloseButton type="other" text="submit" disabled={!submitOption}/>
                    </form>
            </WindowWrapper>

            <style jsx>
            {`
                #lottery-form {
                    display: flex;
                    flex-direction: column;
                    padding: 20px;
                    background-color: #E9FFFD;
                    max-width: 45ch;
                    border-left: 1px solid  #7DF9FF;
                    border-top: 1px solid #7DF9FF;
                    border-bottom: 1px solid  #A899E6;
                    border-right: 1px solid  #A899E6;
                }
                #lottery-form input {
                    background-color: #FAFAFA;
                    border-top: 2px solid  #7DF9FF;
                    border-left: 2px solid #7DF9FF;
                    border-bottom: 2px solid  #A899E6;
                    border-right: 2px solid  #A899E6;
                    padding: 2px 5px;
                }
                #lottery-form span {
                    margin: 1px;
                    color: grey;
                    padding: 1px;
                }
                #button-inside {
                    margin: 2px;
                    border: 1px dotted grey;
                }
                button:hover, a:hover {
                    cursor: pointer;
                }
                #lottery-form label {
                    display: flex;
                    flex-direction: row;
                    color: grey;
                    margin: 10px;
                }
                p {
                    padding-left: 10px;
                    color: grey;
                }
                #lottery-form  a {
                    text-decoration: underline;
                }
                #tc {
                    color: grey;
                    text-align: center;
                    margin: 10px;
                }
                input:focus {
                    outline: none;
                    box-shadow: 1px 1px 30px  #7DF9FF;
                }
                #consent input:focus {
                    box-shadow: none;
                }
            `}
            </style>
        </div>
    )
}

export default Lottery