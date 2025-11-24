'use client'

import AddFriend from "../components/Settings/AddFriend";
import Friends from "../components/Settings/Friends"

const Settings:React.FC = () => {

    // do a query to get all friends 

    return (
        <>
        <div id="setting-body">
            <div id="display-settings">
                <img id="profile-pic" src="./old-windows-screen-saver.jpg"/>
                <p>Username:</p>
            </div>
            <hr/>
            <div id="contact-settings">
                <p>email:</p>
                <p>phone-number: </p>
                <button>edit</button>
            </div>
            <hr/>
            <Friends/>
            <AddFriend/>
        </div>
        <style jsx>
            {`
                #setting-body {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }
                #profile-pic {
                    border-radius: 50px;
                    height: 100px;
                    width: 100px;
                    border: 2px solid white;
                    margin: 10px;
                }
            `}
        </style>
        </>
    )
}

export default Settings;