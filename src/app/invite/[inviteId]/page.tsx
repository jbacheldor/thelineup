'use client'

import { useParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from "react"

const initialForm = {
    name: '', 
    email: '',
    number: '',
    author: 0
}

const Invite:React.FC =  () => {
    const {inviteId} = useParams()
    const pathname = process.env.BASE_URL
    const [invite, setInvite] = useState('')
    const [form, setForm] = useState(initialForm)
    const [loading, setLoading] = useState(true)


    const getInvite = async () => {
        if(inviteId) {
            await fetch(`${pathname}/server/invites/getinvite?` + new URLSearchParams({
                inviteId: inviteId as string,
                }).toString(), {
                    method: 'GET'
                }).then (async (res)=> {
                    const data = await res.json()
                    if(res.status == 200){
                        setLoading(false)
                        setForm({
                            ...form,
                            email: data.email
                        })
                        setInvite(data)
                    }
                })
        }
    }

    useEffect(()=> {
        getInvite()
    }, [])

    const updateForm = (e: ChangeEvent) => {
        setForm({
            ...form,
            [e.target.ariaLabel || '']: (e.target as HTMLInputElement).value
        })
    }

    const createAccount = (e: React.FormEvent) => {
        e.preventDefault()

        // if valid
        // check if email exists in the system or something
        // what are all the possible routes

        fetch(`${pathname}/server/invites/createaccount`, {
            method: 'POST',
            body: JSON.stringify(form)
        }).then((res)=> {
            if(res.status == 200){
                setForm(initialForm)
                // redirect back to feed or something
            }
        })
    }

    // if invite already accepted??? 

    return (
        <div id="invite">
            {loading && <>
                <h3>checking invite status...</h3>
            </>}
            {(!loading && invite) &&
            <>
                <h3>you've been invited!! create an account? </h3>
                <div>
                    <form onSubmit={(e)=>createAccount(e)}>
                        <label>
                            <p>name</p>
                            <input required aria-label="name" onChange={(e)=>updateForm(e)} value={form.name}></input>
                        </label>
                        <label>
                            <p>email</p>
                            <input required aria-label="email" onChange={(e)=>updateForm(e)} value={form.email}></input>
                        </label>
                        <label>
                            <p>number</p>
                            <input aria-label="number" onChange={(e)=>updateForm(e)} value={form.number}></input>
                        </label>
                        <button>submit</button>
                    </form>
                </div>
            </>
            }
        
        <style jsx>
            {`
            #invite {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 30px;    
            }
            
            `}
        </style>
        </div>
    )
}

export default Invite;