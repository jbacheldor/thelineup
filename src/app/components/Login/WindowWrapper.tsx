'use client'

import { JSX } from "react";
import CloseButton from "../CloseButton";

type Props = {
    children: JSX.Element
    name: string, 
    onClose: () => void;
}

const WindowWrapper:React.FC<Props> = ({children, name, onClose}) => {

    return (
        <div id="window-wrapper">
            <div id="top-banner">
                <p>{name}</p>
                <CloseButton type="close" text="x" onClickEvent={onClose}/>
            </div>
        {children}

         <style jsx>
            {`
                #window-wrapper {
                    position: absolute;
                    top: 25%;
                    max-width: 350px;
                    z-index: 10;
                    background-color: white;
                }
                #top-banner {
                    background-image: linear-gradient(to right, #A899E6, #7DF9FF);
                    width: 100%;
                    padding: 5px;
                    border: 1px white solid;
                    display: flex;
                    justify-content: space-between;
                }
            `}
            </style>
        </div>
    )
}

export default WindowWrapper;