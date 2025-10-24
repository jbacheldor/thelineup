'use client'
import { createContext, ReactElement, ReactNode, useMemo, useState } from "react";
import { getToken, parseJwt, Token, validateJWT, verifyJWT } from './utils';

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

    // maybe a wee bit of a use effect???
    // the use case of , access token bad, refresh token, i think needs to be built out
    const onFirstLoad = async () => {
        const access_token = getToken('access-token')
        if(access_token) {
            // if the access token has expired
            if(validateJWT(parseJwt(access_token))) {
                // check refresh token 
                console.log('oooh no mama miaaaa, this is token is expired')
            }
            else if (await verifyJWT(access_token)) {
                // this checks if the token is valid -
                // if not 
                console.log('oooh noooo mama miaaa, this token has been tampered with')
            }
        }
    }

    // this 
    const logout = () => {
        setAuth(initAuth)
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
    }

    // this needs to be called from like,, 
    const login = (accessToken: string, refreshToken: string) => {
        localStorage.setItem('access-token', accessToken);
        localStorage.setItem('refresh-token', refreshToken);

        const res = parseJwt(accessToken)
        console.log(res)

        // i think we will need to do a custom jwt situation

        setAuth({
            isAuth: true, 
            name: res.email, 
            author: res.author
        })
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