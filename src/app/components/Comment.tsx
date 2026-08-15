'use client'

import { useState } from "react"

type Props = {
    value: {
        text: string,
        date: string,
        user: string,
        id: string
    }
}

const Comment:React.FC<Props> = ({value}) => {
    const [editMode, setMode] = useState(false)
    const [text, setText] = useState(value.text)

    const API_URL = process.env.API_URL

    const deleteComments = async (id: string) => {

        await fetch(`${API_URL}/comment/deleteComment/${id}`, {
            method: 'DELETE'
        }).then((res)=> {
            if(res.status == 200){
                // delete comments
            }
        })
    }

    const editComments = async () => {

        await fetch(`${API_URL}/comment/editComment`, {
            method: 'POST',
            body: JSON.stringify({
                text: text,
                comment_id: value.id
            }),
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json',
            //     // "Access-Control-Allow-Origin": "*",
            //     // "Access-Control-Allow-Methods": "*",
            //     // "Accept-Patch": "*/*"
            // },
            // headers: {
            //     'Content-Type': 'application/json',
            // }
        }).then((res)=> {
            if(res.status == 200){
                setMode(false)
            }
        })
    }

    const onEdit = (e: any) => {
        setText(e.target.value)
    }

    return (
        <div id="comment" aria-label={value.id}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <button onClick={()=>setMode(!editMode)}>edit</button>
                <button onClick={()=> deleteComments(value.id)}>x</button>
            </div>
            {editMode && 
                <>
                    <textarea style={{width: '100%', minHeight: '10ch', padding: '2px'}} value={text} onChange={(e)=>onEdit(e)}/>
                    <button onClick={()=>editComments()}>save</button>
                </>
            }
            {!editMode && 
                <p id="comment-text" >{text}</p>
            }
            <div id="user-info">
                <span>{value.user}</span>
                <span>{value.date}</span>
            </div>
            <hr/>
        </div>
    )
}

export default Comment