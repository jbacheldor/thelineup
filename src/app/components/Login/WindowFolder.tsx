

const WindowFolder:React.FC = () => {


    return (
        <>
        
         <div id='login-window-folder'>
                <div id="top-bar">
                    <p>Login</p>
                    <span>
                        <button>_</button>
                        <button>[]</button>
                        <button>x</button>
                    </span>
                </div>
                <div id="search-bar-section">
                    <div id='left-side'>
                        <button>=</button>
                        <button>p</button>
                        <button>n</button>
                        <div className="file-bar section">
                            <img src={"/closed-folder.svg"} width="10px" height="10px"/>
                            <input placeholder="C:\file\login"></input>
                        </div>
                    </div>
                    <div className='search-bar section'>
                        <input placeholder="search"></input>
                    </div>
                </div>
                <div id="main-login-window">
                    <div id="folder">
                        <img src={"/closed-folder.svg"}/>
                        <p>code.exe</p>
                    </div>
                    <div id="folder">
                        <img src={"/closed-folder.svg"}/>
                        <p>password.exe</p>
                    </div>
                </div>
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
                    height: 20px;
                }
                #left-side {
                    display: flex;
                    flex-direction: row;
                }
                #left-side button {
                    padding: 0 2px;
                    margin: 0 1px;
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
                .file-bar {
                    border: 1px solid black;
                    padding: 0 2px;
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