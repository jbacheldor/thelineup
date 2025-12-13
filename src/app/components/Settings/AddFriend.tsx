'use client'

import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import { UserContext } from "@/app/userContext";
import revalidateAction from "@/app/actions";
import { v4 } from "uuid";
import { link } from "fs";

type Props = {
    invitesList: InvitesType[]
}

export type InvitesType = {
    name: string,
    email: string, 
    sent_on: string,
    uuid: string,
}

type Form = {
    name: string,
    email: string
}

const initialForm: Form = {
    name: '',
    email: ''
}


const AddFriend:React.FC<Props> = ({invitesList}) => {
    const pathName = process.env.BASE_URL
    const [invitesSent, setInvites] = useState<InvitesType[]>(invitesList)
    const [form, setForm] = useState<Form>(initialForm)
    const [linkVal, setLink] = useState('')

    const [msg, setMsg] = useState('')

    const resendEmail = async () => {
        // hit endpoint which handles this
    }

    const cancelInvite =  async (e: React.MouseEvent) => {
        const uuid = (e.target as HTMLElement).ariaLabel
        
        // update db
        await fetch(`${pathName}/server/settings/cancelinvite`, {
            method: 'PATCH',
            body: JSON.stringify({
                id: uuid
            })
        }).then((res) => {
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

    const {user} = useContext(UserContext)

    const sendInitialInvite = async (e: React.FormEvent) => {
        e.preventDefault()

        if(!form.email.includes('@') || !form.email.includes('.')){
            setMsg('improper email. try again')
            return
        }
        
        if(invitesSent.find((element)=> form.email == element.email)) {
            setMsg('User already exists - Check existing invite list')
        } else {
            await fetch(`${pathName}/server/settings/sendinvite`, {
                method: 'POST',
                body: JSON.stringify({
                    form,
                    name: user.name,
                    user_id: user.id,
                    instance: user.instance_id
                })
            }).then((res)=> {
                // we should revalidate this query bc uuid kept on server side
                if(res.status == 200){
                    // unsure if this is working rn
                    // revalidateAction('invites')
                }   
            })
        }

        // add to data base
        // also randomly generate id
    }  

    const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.ariaLabel || '']: e.target.value})
    }

    const copyText = () => {
        // Copy the text inside the text field
        navigator.clipboard.writeText(linkVal);

        // Alert the copied text
        alert("Copied the text: " + linkVal);
    }

    const generateLink = () => {
        const uuid = v4();
        setLink(`${pathName}/invite/instance?=${user.instance_id}/${uuid}`)
    }

    return (
        <div id="add-friends">
            <h3>invite link</h3>
            
            <button onClick={()=>generateLink()}>generate link</button>
            <div id="link-generation">
                
                <p>{linkVal}</p>
                <button disabled={linkVal == ''} onClick={()=> copyText()}>copy to clipboard</button>
            </div>

            
            <h3>Add Friends</h3>
                <h4>{msg}</h4>
                <form id="send-invite">
                <label>
                    <span>name</span>
                    <input aria-label="name" value={form.name} onChange={(e)=>updateForm(e)}/>
                </label>
                <label>
                    <span>email</span>
                    <input aria-label="email" value={form.email} onChange={(e)=>updateForm(e)}/>
                </label>
            <button onClick={(e)=> sendInitialInvite(e)}>send invite email</button>
                </form>
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
                #send-invite {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                #send-invite > input {
                    min-width: 50ch;
                }
                #link-generation {
                    display: flex;
                    flex-direction: row;
                }
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