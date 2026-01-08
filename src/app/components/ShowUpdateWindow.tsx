import React from 'react';
import './style.css'
import Image from 'next/image';

type Props = {
    crushName?: string,
    closeWindow?: () => void,
    showProfile?: () => void,
}

function ShowUpdateWindow (props: Props) {
    const {crushName, closeWindow, showProfile} = props

    // get crush updates 
    // passive

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
            <div className="crush-update-body">
                <div className="crush-updates">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
            </div>
        </div>
        </>
    )

}

export default ShowUpdateWindow