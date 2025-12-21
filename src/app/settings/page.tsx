'use client'
import Image from "next/image";
import AddFriend, { InvitesType } from "../components/Settings/AddFriend";
import Friends, { FriendsType } from "../components/Settings/Friends"
import { cache, useEffect } from 'react'

import { useContext, useState } from "react";
import { UserContext } from "../userContext";

type contactForm = {
    username: string,
    email: string,
    number: string
}
const initialContact:contactForm = {
    username: '',
    email: '',
    number: ''
}

type SettingInfo = {
    friends: FriendsType,
    invites: InvitesType[]
}

const initInfo: SettingInfo = {
    friends: [],
    invites: []
}

const Settings:React.FC = () => {
    const { user } = useContext(UserContext)
    const [contact, setContact] = useState(initialContact)
    const pathName = process.env.BASE_URL
    const [settingInfo, setInfo] = useState<SettingInfo>(initInfo);

    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(true)

    // do a query to get all friends 

    const onClick = () => {
        setEditMode(!editMode)
    }

    const getUserInfo = cache(async () => {
        await fetch(`${pathName}/server/settings/getsettings?` + new URLSearchParams({
            id: user.id
        }).toString(), {
            method: "GET",
            next: { tags: ['invites']}
        }, ).then(async (data)=> {
            const res = await data.json()
            if(res.status == 200){
                setInfo(res.data)
                setLoading(false)
            }

        }).catch((error)=> {
            console.log('catch an error: ', error)
        })
    })

    useEffect(()=> {
        setContact({
            username: user.name,
            email: user.email,
            number: user.number || '',
        })
        getUserInfo()
    }, [])

    const updateContact = (e: React.FormEvent) => {
        
        setContact(
            {...contact,
             [(e.target as HTMLInputElement).ariaLabel || '']: (e.target as HTMLInputElement).value   
            }
        )
    }

    return (
        <>
        <div id="setting-body">
            <div id="display-settings">
                <Image alt="profile picture"  style={{borderRadius: '50px', border: '2px solid white', margin: '10px'}} id="profile-pic" src={"/old-windows-screen-saver.jpg"} width={100} height={100}/>
            </div>
            <hr/>
            <div id={`contact-settings`} className={`settings-${editMode}`}>
                {!editMode && <button id="pen-button" onClick={()=>onClick()}><Image alt="pen edit button" height={20} width={20} src="/pen.svg"/></button>}
                {editMode && <button id="pen-button" onClick={()=>onClick()}>x</button>}
                <label>
                    <p>username:</p>
                    {!editMode && <p>{contact.username}</p>}
                    {editMode && <input value={contact.username} onChange={(e)=>updateContact(e)} aria-label="username"/>}
                </label>
                <label>
                        <p>email: </p>
                        {!editMode && <p>{contact.email}</p>}
                    {editMode && <input value={contact.email} onChange={(e)=>updateContact(e)} aria-label="email"/>}
                </label>
                <label>
                        <p>number: </p>
                        {!editMode  && <p>{contact.number}</p>}
                    {editMode &&  <input value={contact.number} onChange={(e)=>updateContact(e)} aria-label="number"/>}
                </label>
                {editMode && <button id="save-button" onClick={()=> onClick()}>save</button>}
            </div>
            <hr/>
            {!loading && 
                <>
                    <Friends friendList={settingInfo.friends}/>
                    <AddFriend invitesList={settingInfo.invites}/>
                </>
            }
            <button>delete account???</button>
            <button>download data</button>
            <button>clear data</button>
        </div>
        <style jsx>
            {`
                #save-button {
                    display: flex;
                    justify-self: center;
                    margin: 5px;
                }
                button:hover {
                    cursor: pointer;
                }
                #pen-button {
                    border: none;
                    background: none;
                    justify-self: flex-end;
                }
                #setting-body {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }
                #contact-settings {
                    width: 230px;
                    position: relative;
                }
                #pen-button {
                    position: absolute;
                    top: -15px; 
                    right: 5px;
                }
                #contact-settings > label {
                    display: flex;
                    justify-content: center;
                    margin: 2px;
                }
                .settings-true > label {
                    display: flex;
                    flex-direction: column;
                }
                .settings-false > label {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                }
                input {
                    padding: 1px 2px;
                }
            `}
        </style>
        </>
    )
}

export default Settings;