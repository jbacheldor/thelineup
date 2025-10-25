'use client'
import { createContext, ReactElement, useEffect, useState } from "react";
import { getToken, parseJwt, verifyJWT } from './utils';
import { redirect } from "next/navigation";

enum Roles {
    Demo = "Demo",
    Lottery = "Lottery",
    Family = "Family",
    Recurse = "Recurse",
    Girls = "Girls",
    None = "None"
}

type User = {
    isAuthenticated: authObj,
    login: (accessToken: string, refreshToken: string) => void,
    logout: () => void,
    setAuth: (auth: authObj) => void,
}

type authObj = {
    isAuth: boolean,
    name: string,
    author: boolean,
}

const initAuth: authObj = {
    isAuth: false,
    name: "",
    author: false
}

const authObject: User = {
    isAuthenticated: initAuth,
    setAuth: () => {},
    login: () => {},
    logout: () => {},
}



const AuthContext = createContext(authObject)

const CounterProvider = (props: {children: ReactElement}) => {
    const [isAuthenticated, setAuth] = useState(initAuth)
    // const value = useMemo(() => ({ isAuthenticated, setAuth }), [isAuthenticated, setAuth]);


    useEffect(()=> {
        console.log('how many times is this being called,,,, ')
        initialLoad()
    }, [])
    // maybe a wee bit of a use effect???
    // the use case of , access token bad, refresh token, i think needs to be built out
    const initialLoad = async () => {
        const access_token = getToken('access-token')
        if(access_token) {
            // if the access token has expired
            if(!await verifyJWT(access_token)) {
                // this checks if the token is valid -
                // if not 
                console.log('oooh noooo mama miaaa, this token has been tampered with')
            }
            else {
                // if valid just update state instead of making a new cal
                const res = parseJwt(access_token)
                setAuth({
                    isAuth: true, 
                    name: res.email, 
                    author: true
                })
                redirect("/leaderboard")
            }
        }
    }

    // this 
    const logout = () => {
        setAuth(initAuth)
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
        redirect("/")
    }

    // this needs to be called from like,, 
    const login = (accessToken: string, refreshToken: string) => {
        try {
        localStorage.setItem('access-token', accessToken);
        localStorage.setItem('refresh-token', refreshToken);

        const res = parseJwt(accessToken)

        // i think we will need to do a custom jwt situation

        setAuth({
            isAuth: true, 
            name: res.email, 
            author: true
        })
        }catch(error){
            console.log('it appears there is an error', error)
            throw new Error('it appears there is an error')
        }
    }


    return (
        <AuthContext.Provider value={
            {
                isAuthenticated,
                setAuth,
                logout,
                login
            }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}

export {CounterProvider, AuthContext};