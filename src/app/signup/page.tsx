'use client'

import { ChangeEvent, useEffect, useState } from "react"

const initialForm = {
    name: '',
    email: '',
    number: ''
}

const SignUp:React.FC = () => {
    const pathname = process.env.BASE_URL
    const [invites, setInvite] = useState('')
    const [form, setForm] = useState(initialForm)

    const getInvite = async () => {

        await fetch(`${pathname}/invite/getinvites`, {
            method: 'GET',

        }).then((res)=>{
            if(res.status){

            }
        })
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
        {invites &&
            <div>
                <button>accept</button>
                <button>reject</button>
            </div>
        }
        
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

        <style jsx>
            {`
            
            `}
        </style>
        </>
    )
}

export default SignUp;