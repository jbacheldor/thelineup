import React, { useEffect, useState } from 'react';
import './style.css'
import Update from './Update';

type Props = {
    crushName?: string,
    crushId?: string,
    closeWindow?: () => void,
    showProfile?: () => void,
}

type update = {
    date: string,
    id: string,
    text: string,
}

const localData: update[]= [
    {
        date: 'today',
        id: '1',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standar'
    },
    {
        date: 'today',
        id: '2',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standar'
    },
    {
        date: 'today',
        id: '3',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standar'
    },
    {
        date: 'today',
        id: '4',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standar'
    },
]

function ShowUpdateWindow (props: Props) {
    const {crushName, closeWindow, showProfile, crushId} = props
    const [updates, setUpdates] = useState<update[] | null>(null)
    const [comment, showComment] = useState('')
    const API_URL = process.env.API_URL

    // get crush updates 
    // passive

    const getUpdates = async () => {
        fetch(`${API_URL}/crushes/getUpdates/${crushId}`, {
            method: 'GET'
        })
        .then(async (res)=> {
            if(res.status == 200) {
                const data = await res.json()
                setUpdates(data)
            }
        })
        .catch((error)=> {
            console.error('error caught from back-end whilst getting crushes', error)
            throw new Error(error)
        })
    }
    
    useEffect(() => {
        // getUpdates()
    }, [])

    return (
        <>
        <div className="crush-update-window">
            <span className="crush-update-header">
                {crushName ? crushName : "crush name here"}
                {showProfile &&
                                <button onClick={showProfile}><span>show profile</span></button>
                }
                {closeWindow &&
                    <button onClick={closeWindow}><span>x</span></button>
                }
                
            </span>
            <div className="crush-update-body">
                <div className="crush-updates">
                    {localData && localData?.map((val, index)=> (
                        <Update val={val} index={index} key={`comment-${val.id}`}/>
                    ))}
                {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. */}
                </div>
            </div>
        </div>
        </>
    )

}

export default ShowUpdateWindow