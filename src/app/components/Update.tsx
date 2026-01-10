'use client'

import { UserContext } from "@/app/userContext";
import { useContext, useState } from "react";
import Comment from "./Comment";

type Props = {
    index: number,
    val: {
        date: string,
        text: string,
        id: string
    }
}

const localComments = [
    {
        text: 'today i come to u ,not AS A MAN, but as alad',
        date: 'today',
        user: 'hawk chewa',
        id: '1'
    },
    {
        text: 'honk honk honk i love thsi one',
        date: 'march 15th',
        user: 'danny brown',
        id: '2'
    },
        {
        text: 'is he stupid',
        date: 'xxxx',
        user: 'egg nog',
        id: '3'
    }
]

const Update:React.FC<Props> = ({index, val}) => {
    const [comment, showComment] = useState(false)
    const [commentText, setComment] = useState('')
    const [comments, setComments] = useState()

    const API_URL = process.env.API_URL

    const {user} = useContext(UserContext)

    const submitComment = async (e: any) => {
        e.preventDefault()
        fetch(`${API_URL}/comment/newComment`, {
            method: 'POST',
            body: JSON.stringify({
                user_id: user.id,
                text: commentText,
                post_id: val.id
            })
        }).then((res)=>{
            if(res.status == 200){
                setComment('')
                // and maybeeee
                // just maybe,,, 
                // do a cache refresh once it's post yk 
                // like grab the comments or whatever
                // or make her slowly appear. razzle dazzle
            }
        })
    }


    const getComments = async () => {
        await fetch(`${API_URL}/comment/getComments/${val.id}`, {
            method: 'GET'
        }).then(async (res)=> {
            if(res.status == 200){
                const data = await res.json()
                setComments(data)
            }
        })
    }

    // if admin then we need a delete comment

    return (
        <div key={index}>
            <div id="comment-title">
                <h5>{val.date}</h5>
                <h6 style={{color: 'grey'}}>17 hours ago</h6>
            </div>
            
            <hr/>
            <p id="the-meat">{val.text}</p>
            <div id="interaction-results">
                {/* <p>likes</p> */}
                <p onClick={()=>showComment(!comment)}>{localComments.length} comments</p>
                <button onClick={()=>showComment(!comment)}>comment</button>
                
            </div>
            {/* <div id="interaction-buttons">
                <button>like</button>
                <button onClick={()=>showComment(true)}>comment</button>
            </div> */}
            {comment && 
            <div id='comment-section'>
                <div>
                {localComments.map((value, index)=> 
                    <Comment value={value}/>
                )}
                    
                </div>
                <div id='add-comments'>
                    <textarea value={commentText} onChange={(e)=>setComment(e.target.value)}/>
                    <button onClick={(e)=>submitComment(e)}>submit</button>
                </div>
            </div>}
            <hr/>
        </div>
        
    )
}

export default Update;