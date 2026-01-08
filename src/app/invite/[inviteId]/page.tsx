'use client'

import app from '@/app/server/createClient'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react"

const initialForm = {
    name: '', 
    email: '',
    number: '',
    password: '',
}

type Form = {
    name: string,
    email: string,
    number: string,
    password: string
}

const Invite:React.FC =  () => {
    const {inviteId} = useParams()
    const API_URL = process.env.API_URL
    const [invite, setInvite] = useState('')
    const [form, setForm] = useState<Form>(initialForm)
    const [loading, setLoading] = useState(true)


    const getInvite = async () => {
        if(inviteId) {
            await fetch(`${API_URL}/invites/getinvite/${inviteId}`, {
                    method: 'GET'
                }).then (async (res)=> {
                    const data = await res.json()
                    if(res.status == 200){
                        setLoading(false)
                        setInvite(data)
                    }
                })
        }
    }

    useEffect(()=> {
        getInvite()
    }, [])

    const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.ariaLabel || '']: e.target.value
        })
    }

    const createAccountRecord = async (userId: string) => {
        fetch(`${API_URL}/invites/createaccount`, {
            method: 'POST',
            body: JSON.stringify({
                'form': {...form, author: 0},
                'id': userId
            })
        }).then(async (res)=> {
            if(res.status == 200){
                // setForm(initialForm)

                // redirect back to feed or something
                // or say like,, success would u like to ??
            }
        })
    }

     const createAccount = async (e: React.FormEvent) => {
        e.preventDefault()
        // if valid
        // check if email exists in the system or something
        // what are all the possible routes
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

            createAccountRecord(user.uid)
             
        })
        .catch((error) => {
            console.log('are we in error ??', error)
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

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
                            <input required aria-label="name" onChange={(e)=>updateForm(e)} value={form.name}/>
                        </label>
                        <label>
                            <p>email</p>
                            <input required aria-label="email" onChange={(e)=>updateForm(e)} value={form.email}/>
                        </label>
                        <label>
                            <p>password</p>
                            <input required aria-label="password" onChange={(e)=>updateForm(e)} value={form.password}/>
                        </label>
                        <label>
                            <p>number</p>
                            <input aria-label="number" onChange={(e)=>updateForm(e)} value={form.number}/>
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