import React from 'react';
import './style.css'

type Props = {
    crushName?: string,
    closeWindow?: () => void,
    showProfile?: () => void,
}

function ShowUpdateWindow (props: Props) {
    const {crushName, closeWindow, showProfile} = props
    const myRef = React.useRef(null);
    let scrollHeight = 0;
    // console.log(myRef.current.getBoundingClientRect());

    React.useEffect(()=> {
        console.log(myRef.current.getBoundingClientRect());
        // scrollHeight = myRef.current.getBoundingClientRect().height
    }, [])

    const onKeyUp = (direction: string) => {
        console.log(direction)
        console.log("wow wowowo", myRef.current.getBoundingClientRect());
    }

    return (
        <>
        <div className="crush-update-window">
            <span className="crush-update-header">
                {crushName ? crushName : "crush name here"}
                {showProfile &&
                                <button onClick={showProfile}><span>show profile</span></button>
                }
                {closeWindow &&
                    <button onClick={closeWindow}><span>x</span></button>
                }
                
            </span>
            <div className="crush-update-body" ref={myRef}>
                <div className="crush-updates">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div className ="crush-scroll-bar">
                <div className="button-wrapper">
                    <img src={`/up-arrow.svg`}/>
                </div>
                    <div className='scroll-available' >
                        <div className="scroll-remaining" style={{height: scrollHeight ? scrollHeight : "10px"}}>
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <img src={`/down-arrow.svg`}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default ShowUpdateWindow