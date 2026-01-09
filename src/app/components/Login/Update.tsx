'use client'

import { useState } from "react";

type Props = {
    index: number,
    val: {
        date: string,
        text: string,
        id: string
    }
}

const Update:React.FC<Props> = ({index, val}) => {
    const [comment, showComment] = useState(false)

    return (
        <div key={index}>
            <div>
                <h5>{val.date}</h5>
                <h6>17 hours ago</h6>
            </div>
            
            <hr/>
            <p>{val.text}</p>
            <div id="interaction-results">
                <p>likes</p>
                <p>comments</p>
            </div>
            <div id="interaction-buttons">
                <button>like</button>
                <button onClick={()=>showComment(true)}>comment</button>
            </div>
            {comment && 
            <div id='comment-section'>
                <textarea/>
                <button>submit</button>
            </div>}
            <hr/>
        </div>
    )
}

export default Update;