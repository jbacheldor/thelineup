'use client'

import React, { useEffect, useRef, useState } from "react"
import Lottery from "../components/Lottery"
import path from "path"
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
            <h1>YOU ARE IN THE LOGIN PAGE!!!</h1>
            <Login/>
        </div>
        )
}

export default LoginPage