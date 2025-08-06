import { useEffect, useRef, useState } from "react";

type Props = {
    time: number,
    initialString: string,
    secondString: string,
    onClick: () => Promise<void>;
}

const Timer:React.FC<Props> = ({time, initialString, secondString, onClick}) => {
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
            <button disabled={resendCode} onClick={onCodeSent}>{codeSent ? secondString : initialString}</button>
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
                button {
                    margin: 10px 0;
                    align-self: center;
                    border-top: 2px solid  #7DF9FF;
                    border-left:2px solid #7DF9FF;
                    border-bottom:2px solid  #A899E6;
                    border-right:2px solid  #A899E6;
                    padding: 5px;
                }
                `}
            </style>
        </>
    )
}

export default Timer;