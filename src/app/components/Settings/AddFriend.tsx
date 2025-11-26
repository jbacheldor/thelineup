'use client'

import { useState } from "react";

type Props = {
    invitesList: InvitesType[]
}

const invites = [{name: 'lisa', email: 'lisalovessoccer@gmail.com', date: '13 days ago'}, {name: 'jane', email: 'sexygurl123@hotmail.com', date: '23 days ago'}]

export type InvitesType = {
    name: string,
    email: string, 
    sent_on: string,
    id: string,
}


const AddFriend:React.FC<Props> = ({invitesList}) => {
    const [invitesSent, setInvites] = useState<InvitesType[]>(invitesList)

    return (
        <div id="add-friends">
            <h3>Add Friends</h3>
            <label>
                <span>name</span>
                <input/>
            </label>
            <label>
                <span>email</span>
                <input/>
            </label>
            
            <button>send invite email</button>
            <h3>invites sent</h3>
            <div id="invites">
                {invitesSent.map((val, index)=> (
                    <div id="invite" key={index}>
                        <div id="invite-info">
                            <p>{val.name}</p>
                            <p>{val.email}</p>
                            <p>{val.sent_on}</p>
                        </div>
                        <div id="buttons">
                            <button>resend email</button>
                            <button>cancel invite</button>
                        </div>
                    </div>
                ))}
            </div>
            <style jsx>
            {`
                h3 {
                    text-decoration: none;
                    text-align: center;
                    padding: 10px;
                }
                #buttons {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }
                #add-friends {
                    display: flex;
                    flex-direction: column;
                    margin: 20px;
                }
                #invites {
                    display: flex;
                    flex-direction: column;
                }
                #invite-info {
                    display: flex;
                    flex-direction: row;
                }
                #invite-info > p {
                    padding: 2px 6px;
                }
            `}
            </style>
        </div>
    )
}

export default AddFriend;