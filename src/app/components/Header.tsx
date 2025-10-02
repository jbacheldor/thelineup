'use client'
import { redirect } from "next/navigation";

type Props = {
    user: string
}

const Header:React.FC<Props> = ({user}) => {

    const onClick = (e: any) => {
        console.log(e)
        if(e.target.innerHTML == "home"){
            redirect("/")
        }
        else redirect(`/${e.target.innerHTML}`)
    }

    return (
        <div id="header">
            <div id="links">
                <button className="nav-button" onClick={(e)=> onClick(e)}>home</button>
                <button className="nav-button" onClick={(e)=> onClick(e)}>leaderboard</button>
            </div>
            <div id='auth-info'>
                Logged in as: {user}
                <img id="notifications" src={"/bell.png"}/>
            </div>
            

            <style jsx>
                {`
                    #header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin: 5px;
                        width: 100%;
                    }
                    button.nav-button {
                        background: #FFFFFF;
                        background: radial-gradient(circle,rgba(0, 0, 0, 1) 0%, rgba(245, 233, 191, 1) 0%, rgba(232, 197, 70, 1) 99%);
                        border-start-start-radius: 50px 100px;
                        border-start-end-radius: 50px 100px;
                        padding: 7px 15px;
                        text-align: center;
                        border: none;
                        border-right: 1px solid pink;
                        box-shadow: 4px 4px 10px grey;
                    }
                    div#auth-info {
                        display: flex;
                        
                    }
                    img#notifications {
                        width: 22px;
                        height: 22px;
                        margin: 0 10px;
                    }   
                `}
            </style>
        </div>
    )
}

export default Header;