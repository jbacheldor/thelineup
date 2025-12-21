'use client'

import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { UserContext } from "../userContext";

type form = {
    severity: string,
    type: string,
    details: string,
    followup: boolean,
    email?: string,
    id?: string,
    attachments?: [],
}

const BugReport:React.FC = () => {
    const [form, setForm] = useState({});
    const [attachments, setImages] = useState([])
    const pathname = process.env.BASE_URL
    const {user} = useContext(UserContext)

    const updateForm = (e: React.ChangeEvent) => {
        setForm({
            ...form,
            [e.target.ariaLabel || '']: (e.target as HTMLElement).value
        })
    }

    const submitForm = async (e: FormEvent) => {
        e.preventDefault()

        if(form.followup == 'yes'){
            form.id = user.id
        }

        // if all valid
        // await fetch(`${pathname}/server/submitbug`,
        //     {
        //         method: 'POST',
        //         body: JSON.stringify(form)
        //     }
        // )
        //IF FORM FIRLEDS
    }

    const updateImages = () => {
        setImages([])
    }

    return (
        <div id="page">
        <h2>Report a Bug Report!</h2>
        <p>have u or someone u loved been victimized by a bug on THIS app! report it NOW! so i can fix it.</p>
        <p>it is a one-woman show presently though so be gentle and kind please.</p>
        <form onSubmit={(e)=> submitForm(e)}>
            <label>
                <p>severity</p>
                <select aria-label="severity" onChange={(e)=> updateForm(e)}>
                    <option>scalding hot</option>
                    <option>luke warm</option>
                    <option>cold</option>
                    <option>below freezing</option>
                </select>
            </label>
            <label>
                <p>type</p>
                <select aria-label="type" onChange={(e)=> updateForm(e)}>
                    <option>accessiblity</option>
                    <option>bug fix</option>
                    <option>security</option>
                    <option>other</option>
                </select>
            </label>
            <label>
                <p>can u tell me more about the issue</p>
                <textarea aria-label="details" onChange={(e)=> updateForm(e)}></textarea>
            </label>
            <label>
                <p>do you want a follow-up for this issue</p>
                <p>note: if u select yes we will reach out to email on file</p>
                <select aria-label="followup" onChange={(e)=> updateForm(e)}>
                    <option>yes</option>
                    <option>no</option>
                </select>
            </label>
            <label>
                <p>any attachments</p>
                <p>max of 5 plz - we can expand in follow up emails</p>
                <input
                onChange={()=> updateImages()}
                type="file"
                name="myImage"
                // onChange={(event) => onUpload(event)}
                multiple
                accept=".jpg, .jpeg, .png"
                // disabled={(selectedImage && selectedImage.length >= 5) ? true : false}
                />
            </label>
            <button>submit</button>
        </form>

        {/* 
        then we need to registr the date added 
        & the time
        */}
        <h2>we also have a suggestion box if none of the above applies</h2>
            <label>
                <p>add your thoughts here!</p>
                <textarea></textarea>
            </label>
            <button>submit</button>
        <style jsx>
            {`
            #page {
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
            }
            form {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
            textarea {
                min-width: 300px;
                min-height: 100px;
                padding: 2px;
            }
            
            `}
        </style>
        </div>
    )
}

export default BugReport