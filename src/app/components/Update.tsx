'use client'

import { UserContext } from "@/app/userContext";
import { useContext, useEffect, useState } from "react";
import Comment from "./Comment";

type Props = {
    index: number,
    val: {
        date: string,
        text: string,
        id: string
    }
}

export type CommentType = {
    text: string,
    date: string,
    user: string,
    id: string
}

const Update:React.FC<Props> = ({index, val}) => {
    const [addComentBox, showAddComment] = useState(false)
    const [commentText, setComment] = useState('')
    const [commentList, setCommentList] = useState<CommentType[]>([])

    const API_URL = process.env.API_URL

    const {user} = useContext(UserContext)

    useEffect(()=> {
        // this is so, bad,,, it should only get commentList for one post
        // but they are all listed as post_id 1 lol
        getCommments()
    }, [])

    const submitComment = async (e: any) => {
        const newComment: CommentType = {
            user: user.id,
            text: commentText,
            id: val.id,
            date: new Date().toISOString()
        }
        e.preventDefault()
        fetch(`${API_URL}/comment/newComment`, {
            method: 'POST',
            body: JSON.stringify({
                user_id: user.id,
                text: commentText,
                post_id: val.id,
                date: new Date().toISOString()
            })
        }).then((res)=>{
            if(res.status == 200){
                setComment('')
                // setCommentList([...commentList, newComment])

            }
        })
    }


    const getCommments = async () => {
        await fetch(`${API_URL}/comment/getComments/${val.id}`, {
            method: 'GET'
        }).then(async (res)=> {
            if(res.status == 200){
                const data = await res.json()
                setCommentList(data.data)
            }
        })
    }


    const removeComments = (e: CommentType) => {
        // this - is working but commentList is being weird and idk why
        // setCommentList(commentList.filter(val => val.text !== e.text))
        setCommentList([       { text: 'WHAT THHHHE',
        date: 'xxxx',
        user: 'egg nog',
        id: '3'}])
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
                <p>likes</p>
                <p>{commentList.length} commentList</p>
                <button onClick={()=>showAddComment(!addComentBox)}>comment</button>
            </div>
            {/* <div id="interaction-buttons">
                <button>like</button>
                <button onClick={()=>showAddComment(true)}>comment</button>
            </div> */}
            {commentList && 
            <div id='comment-section'>
                <div>
                {commentList.map((value, index)=> {
                    console.log('what is comments', commentList)
                    console.log('what is valu', value)
                    return (
                    // would it be better to just refresh this whole thing 
                    <Comment key={`comment-${index}`} value={value} onDelete={removeComments}/>)
                })}
                </div>
                {addComentBox &&
                    <div id='add-comments'>
                        <textarea value={commentText} onChange={(e)=>setComment(e.target.value)}/>
                        <button onClick={(e)=>submitComment(e)}>submit</button>
                    </div>
                }
            </div>}
            <hr/>
        </div>
        
    )
}

export default Update;