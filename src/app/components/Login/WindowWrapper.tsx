'use client'

import { JSX } from "react";

type Props = {
    children: JSX.Element
    name: string, 
    onClose: () => void;
}

const WindowWrapper:React.FC<Props> = ({children, name, onClose}) => {

    return (
        <>
        <div className="window-wrapper">
            <div id="top-banner">
                <p>{name}</p>
                <button onClick={onClose}>x</button>
            </div>
        {children}

        </div>
         <style jsx>
            {`
            .window-wrapper {
                    position: absolute;
                    top: 30%;
                    width: 350px;
                    z-index: 10;
                    background-white;
                }
                #top-banner {
                    background-image: linear-gradient(to right, #A899E6, #7DF9FF);
                    width: 100%;
                    padding: 5px;
                    border: 1px white solid;
                    display: flex;
                    justify-content: space-between;
                }
                #top-banner p {
                    color: black;
                }
                #top-banner button {
                    width: 15px;
                    height: 15px;
                    font-size: xx-small;
                    border-top: 2px solid  #7DF9FF;
                    border-left:2px solid #7DF9FF;
                    border-bottom:2px solid  #A899E6;
                    border-right:2px solid  #A899E6;
                }
                button:hover, a:hover {
                    cursor: pointer;
                }
                p {
                    padding-left: 10px;
                    color: grey;
                }
                input:focus {
                    outline: none;
                    box-shadow: 1px 1px 30px  #7DF9FF;
                }
            `}
            </style>
        </>
    )
}

export default WindowWrapper;