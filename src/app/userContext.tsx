'use client'
import { createContext, ReactElement, useContext, useEffect, useState } from "react"
import { AuthContext } from "./context"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import app from "./server/createClient"


type UserObj = {
    id: string, 
    number: string, 
    email: string,
    author: boolean,
    name: string
}

const initObj: UserObj = {
    id: '',
    number: '',
    email: '',
    author: false,
    name: ''
}

type contextType = {
    user: UserObj,
    setUser: (obj: UserObj) => void,
    removeUser: () => void
}

const contextObj: contextType = {
    user: initObj, 
    setUser: () => {},
    removeUser: () => {}
}

const UserContext = createContext(contextObj)

const UserContextProvider = (props: {children: ReactElement}) => {
    const pathName = process.env.BASE_URL
    const [user, setUser] = useState(initObj)
    const auth = getAuth(app);

    const {setAuth} = useContext(AuthContext)

    const getUser = async (id: string) => {
        await fetch(`${pathName}/server/settings/getuserinfo?` + new URLSearchParams({
            id: id,
        }).toString(), {
            method: "GET"
        }).then(async(data)=> {
            const res = await data.json()
            console.log('what is data', res.data)
            if(res.status == 200) {
                console.log('are we in here???')
                setUser({
                    id: res.data.user_id,
                    number: res.data.number,
                    email: res.data.email,
                    author: res.data.author == 1 ? true : false,
                    name: res.data.name,
                })
            }
        }).catch((error)=> {
            console.log('caught an error: ', error)
        })

        console.log('what is user', user)
    }

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
                        author: false, 
                        id: user.uid
                    })
                    getUser(user.uid)
                }
                // ...
            } 
            });
        }, [auth])


    const removeUser = () => {
        setUser(initObj)
    }


    return (
        <UserContext.Provider value={{
            user, 
            setUser,
            removeUser,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext};