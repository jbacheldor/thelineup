'use client'

import { useState } from "react";
import Image from "next/image";

type Props = {
    invitesList: InvitesType[]
}

export type InvitesType = {
    name: string,
    email: string, 
    sent_on: string,
    uuid: string,
}


const AddFriend:React.FC<Props> = ({invitesList}) => {
    const pathName = process.env.BASE_URL
    const [invitesSent, setInvites] = useState<InvitesType[]>(invitesList)

    const resendEmail = async () => {
        // hit endpoint which handles this
    }

    const cancelInvite =  async (e: React.MouseEvent) => {
        console.log('eee', e)
        console.log('ayo', (e.target as HTMLElement).ariaLabel)

        console.log('???')
        const uuid = (e.target as HTMLElement).ariaLabel
        
        // update db
        await fetch(`${pathName}/server/settings/cancelinvite`, {
            method: 'POST',
            body: JSON.stringify({
                id: uuid
            })
        }).then((res) => {
            console.log('what is res', res)
            if(res.status == 200) {
                // find the friend in the list
                // then remove it from the list
                const newFriends = invitesSent.filter((e)=>  e.uuid!= uuid)
                setInvites(newFriends)
            
            }
        })
        // update the above list
        // look into the ssg regeneration situation from next js and see if it's applicable

    }

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
                <div id='login-window-folder'>
                <div id="top-bar">
                    <p>Invites</p>
                    <span>
                        <button>_</button>
                        <button>[]</button>
                        <button onClick={()=>{}}>x</button>
                    </span>
                </div>
                <div id="search-bar-section">
                    <div id='left-side'>
                        <button>=</button>
                        <button >
                            <Image  alt="button to return to previous window" src={"/left-pointer.svg"} width={11} height={11}/>
                            </button>
                        <button disabled>
                            <Image alt="button to go to next window" src={"/right-pointer.svg"} width={11} height={11}/>
                            </button>
                        <div className="section">
                            <Image alt=" closed foler - in fake windows search - nothing to see here" src={"/closed-folder.svg"} width={11} height={11}/> 
                            <input placeholder="C:\file\setting\invites"></input>
                        </div>
                    </div>
                    <div className='section'>
                        <Image alt="search bar" src={"/search.svg"} width={11} height={11}/> 
                        <input placeholder="Search"></input>
                    </div>
                </div>
                     <div id="main-login-window">
                        <table>
                            <tr>    
                                <th></th>
                                <th>name</th>
                                <th>email</th>
                                <th>sent on</th>
                                <th>resend</th>
                                <th>cancel</th>
                            </tr>
                        {invitesSent.map((val, index)=> (
                                <tr  key={index}>
                                    <td><Image alt="closed folder" width={20} height={20} style={{transform: 'rotate(90deg)'}} src="./closed-folder.svg"/></td>
                                    <td id="name"> {val.name}</td>
                                    <td>{val.email}</td>
                                    <td>{val.sent_on}</td>
                                    <td><button>resend</button></td>
                                    <td><button aria-label={val.uuid} onClick={(e)=>cancelInvite(e)}>cancel</button></td>
                                </tr>
                            
                        ))}
                        </table>
                </div>
                </div>
                </div>
            <style jsx>
            {`
                #invite button {
                    padding: 0 5px;
                    height: fit-content;
                }
                table {
                    color: grey;
                }
                th {
                    text-align: left;
                    color: grey;
                    margin: 5px;
                    padding: 0 10px;
                    min-width: 15ch;
                    font-size: 14px;
                    border-right: 1px solid grey;
                    font-weight: 300;
                }
                th:first-child, th:last-child {
                    border: none;
                    min-width: 0;
                }
                tr {
                    padding: 10px 0;
                }
                td {
                    
                    padding: 0 5px;
                    text-align: left;
                }
                #login-window-folder {
                    // width: 350px;
                    background-color: white;
                }
                #left-side {
                    display: flex;
                    flex-direction: row;
                }
                .section {
                    width: max-content;
                    border-left: 1px black solid;
                    border-top: 1px black solid;
                    border-bottom: 1px white solid;
                    border-right: 1px white solid;
                    background-color: white;
                    border: 1px solid black;
                    padding: 0 2px;
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
                #name {
                    color: black;
                }
                #main-login-window {
                    display: flex;
                    flex-direction: column;
                    padding: 5px;
                    justify-content: flex-start;
                    border: 1px solid black;
                    margin: 5px;
                    height: 150px;
                    overflow: scroll;
                }
                #columns {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
                input {
                    width: 14ch; 
                    outline: none;
                    border: none;
                    padding: 0 2px;
                    margin: 0 2px;
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
                #invite {
                    display: flex;
                    flex-direction: row;
                }
                #invites {
                    display: flex;
                    flex-direction: column;
                }
                #invite-info {

                    flex-direction: row;
                    display: flex;
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