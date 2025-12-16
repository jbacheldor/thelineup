'use client'

import { useParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from "react"

const initialForm = {
    name: '',
    email: '',
    number: ''
}

const Invite:React.FC =  () => {
    const {inviteId} = useParams()
    const pathname = process.env.BASE_URL
    const [invites, setInvite] = useState('')
    const [form, setForm] = useState(initialForm)


    const getInvite = async () => {
        if(inviteId) {
            await fetch(`${pathname}/server/invite/getinvites?` + new URLSearchParams({
                inviteId: inviteId as string,
                }).toString(), {
                    method: 'GET'
                }).then (async (res)=> {
                    const data = await res.json()
                })
        }
    }

    useEffect(()=> {
        // getInvite()
    }, [])

    // const reply to invite
    const inviteReply = () => {

    }

    const updateForm = (e: ChangeEvent) => {
        setForm({
            ...form,
            [e.target.ariaLabel || '']: (e.target as HTMLInputElement).value
        })

    }

    const createAccount = (e: React.FormEvent) => {
        e.preventDefault()
    }

    // if invite already accepted??? 

    return (
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
        <h3>all these invites and more are waiting for you!</h3>
        {invites &&
            <div>
                <button>accept</button>
                <button>reject</button>
            </div>
        }
        

        <style jsx>
            {`
            
            `}
        </style>
        </>
    )
}

export default Invite;