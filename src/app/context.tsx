'use client'
import { createContext, ReactElement, useEffect, useState } from "react";
import { parseJwt } from './utils';
import { redirect } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "./server/createClient";


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

const ContextProvider = (props: {children: ReactElement}) => {
    const [isAuthenticated, setAuth] = useState(initAuth)
    const auth = getAuth(app);
    // const value = useMemo(() => ({ isAuthenticated, setAuth }), [isAuthenticated, setAuth]);
    const pathName = process.env.BASE_URL

    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                // const uid = user.uid;
                if(user.email){
                    setAuth({
                        isAuth: true,
                        name: user.email,
                        author: false
                    })
                }
                // ...
            } 
            });
    }, [auth])

    // maybe a wee bit of a use effect???
    // the use case of , access token bad, refresh token, i think needs to be built out
    // const initialLoad = async () => {
    //     try {
    //         await fetch(`${pathName}/server/checkLogin`)
    //         .then(async (res) => {
    //             const res_json = await res.json()
    //             console.log('what is res_json', res_json)
    //             switch(res_json.status){
    //                 case 200: 
    //                     console.log('case 200')
    //                     // login(res_json.data)
    //                     break;
                    
    //                 case 401:
    //                     console.log('case 401')
    //                     logout()
    //                     redirect("/")
    //                     break;
                    
    //                 // this is the refresh use case - no http number unfortunately
    //                 case 403: 
    //                     console.log('case 403')
    //                     const refresh = await silentRefresh()
    //                     // silent refresh has to return a string
    //                     if(!refresh) logout()
    //                     else {
    //                         const email = await refresh.json()
    //                         setAuth({
    //                             isAuth: true, 
    //                             name: email, 
    //                             author: true
    //                         })
    //                         redirect("/leaderboard")}
    //                     break;
    //             }
    //         })
    //     }
    //     catch(error){
    //         console.log('errrrorrr: ', error)
    //     }
    // }

    const logout = async() => {
        await fetch(`${pathName}/server/logout`, {
            method: 'POST',
        }).then(async (res)=> {
            const response = await res.json()

            if(response.status == "200") {
                const auth = getAuth(app);
                signOut(auth)
                .then(async () => {
                    setAuth(initAuth)
                })
                .catch((error) =>{
                    console.log('error: ', error)
                }).finally(()=> {
                    redirect("/")
                })
            }
            else console.log('error logging out.')
        })
    }

    const login = async (accessToken: string) => {
        try {

            const res = parseJwt(accessToken)

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

export {ContextProvider, AuthContext};