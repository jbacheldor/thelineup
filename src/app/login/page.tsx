'use client'

import React from "react"
import Login from "../components/Login"

type loginFormType = {
    email?: string,
    number?: string,
    code: string,
    password: string,
}

type loginStyleType = {
    code: boolean,
    password: boolean,
    email: boolean,
    sms: boolean,
}

const LoginPage:React.FC = () => {
    
    return (
        <div>
            <Login/>
        </div>
        )
}

export default LoginPage