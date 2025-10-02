import { useEffect, useRef, useState } from "react";
import CloseButton from "./General/CloseButton";

type Props = {
    time: number,
    initialString: string,
    secondString: string,
    onClick: () => Promise<void>,
    disabled: boolean,
}

const Timer:React.FC<Props> = ({time, initialString, secondString, onClick, disabled}) => {
    const [timer, setTimer] = useState(time);
    const id = useRef<NodeJS.Timeout>(null)
    const [codeSent, setCode] = useState(false)
    const [resendCode, setResend] = useState(false)

    useEffect(()=> {
        if(timer <= 0) {
            if(id.current) clearInterval(id.current);
            setTimer(time)
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
        onClick()
    }

    return (
        <>        
            <span>
            <CloseButton type="other" disabled={resendCode || disabled} onClickEvent={onCodeSent} text={codeSent ? secondString : initialString}/> 
            {codeSent && <p>Resend in: {timer} seconds</p>}
            </span>
            <style jsx>
                {`
                span {
                    margin: 5px;
                }
                p {
                    position: absolute;
                    font-size: small;
                    display: flex;
                    justify-self: center;
                }
                `}
            </style>
        </>
    )
}

export default Timer;