import { useState } from "react";
import PasswordWindow from "./PasswordWindow";
import CodeWindow from "./CodeWindow";

type props = {
    closeARoo: () => void;
}

const WindowFolder:React.FC<props> = ({closeARoo}) => {
    const [openLogin, setOpenLogin] = useState("");
    const [current, setCurrent] = useState(true)

    const openWindow = (e: any) => {
        if(e.target.ariaLabel == "password") setOpenLogin(e.target.ariaLabel)
        else {
            setOpenLogin(e.target.ariaLabel)
        }
    }
    
    const closeWindow = (e: any) => {
        setOpenLogin("")
    }

    const updateCurrentFolders = () => {
        setCurrent(!current)
    }

    return (
        <>
            {openLogin == "password" &&
                <PasswordWindow closeWindow={closeWindow}/>
           }
            {openLogin == "email" &&
                <CodeWindow type="email" closeWindow={closeWindow}/>
           }
           {openLogin == "sms" &&
                <CodeWindow type="sms" closeWindow={closeWindow}/>
           }
         <div id='login-window-folder'>
                <div id="top-bar">
                    <p>Login</p>
                    <span>
                        <button>_</button>
                        <button>[]</button>
                        <button onClick={closeARoo}>x</button>
                    </span>
                </div>
                <div id="search-bar-section">
                    <div id='left-side'>
                        <button>=</button>
                        <button><img src={"/left-pointer.svg"} width="11px" height="11px"/></button>
                        <button><img src={"/right-pointer.svg"} width="11px" height="11px"/></button>
                        <div className="section">
                            <img src={"/closed-folder.svg"} width="11px" height="11px"/>
                            <input placeholder="C:\file\login"></input>
                        </div>
                    </div>
                    <div className='section'>
                        <img src={"/search.svg"} width="11px" height="11px"/>
                        <input placeholder="Search"></input>
                    </div>
                </div>
                    {current && 
                        <div id="main-login-window">
                            <div id="folder">
                                <img src={"/closed-folder.svg"} aria-label="code" onClick={updateCurrentFolders}/>
                                <p>code.exe</p>
                            </div>
                            <div id="folder">
                                <img src={"/closed-folder.svg"}  aria-label="password" onClick={(e)=> {openWindow(e)}}/>
                                <p>password.exe</p>
                            </div>
                        </div>
                    }
                    {!current &&
                        <div id="main-login-window">
                            <div id="folder">
                                <img src={"/closed-folder.svg"} aria-label="sms" onClick={(e)=> {openWindow(e)}}/>
                                <p>sms.exe</p>
                            </div>
                            <div id="folder">
                                <img src={"/closed-folder.svg"}  aria-label="email" onClick={(e)=> {openWindow(e)}}/>
                                <p>email.exe</p>
                            </div>
                        </div>
                    }

            </div>
            <style jsx>
                {`
                #login-window-folder {
                    position: absolute;
                    top: 30%;
                    width: 350px;
                    background-color: white;
                }
                #main-login-window {
                    display: flex;
                    flex-direction: row;
                    padding: 10px;
                    justify-content: flex-start;
                    border: 1px solid black;
                    margin: 5px;
                    height: 150px;
                }
                #main-login-window #folder {
                    margin: 5px;
                    text-align: center;
                }
                #folder:hover {
                    cursor: pointer;
                }
                #top-bar {
                    display: flex; 
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    height: 30px;
                    padding: 0 10px;
                    margin: 4px;
                    background-image: linear-gradient(to right, #A899E6, #7DF9FF);
                    border: 1px white solid;
                }
                .section {
                    border-left: 1px black solid;
                    border-top: 1px black solid;
                    border-bottom: 1px white solid;
                    border-right: 1px white solid;
                    background-color: white;
                    border: 1px solid black;
                    padding: 0 2px;
                }
                #left-side {
                    display: flex;
                    flex-direction: row;
                }
                #left-side button {
                    padding: 0 2px;
                    margin: 0 1px;
                }
                #left-side img {
                    display: inline-block;
                    vertical-align: middle;
                    height: 100%;
                    float: left;
                }
                #top-bar button {
                    height: 20px;
                    width: 20px;
                }
                #search-bar-section {
                    display: flex;
                    justify-content: space-between;
                    flex-direction: row;
                    background-color: white;
                    background-color: grey;
                    padding: 3px;
                    margin: 5px;
                    background-image: linear-gradient(to left, #A899E6, #7DF9FF);
                }
                input {
                    width: 14ch; 
                    outline: none;
                    border: none;
                    padding: 0 2px;
                    margin: 0 2px;
                }
                `}
            </style>
        </>
    )
}

export default WindowFolder;