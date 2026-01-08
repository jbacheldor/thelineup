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
    name: string,
    instance_id: string,
    title: string
}

const initObj: UserObj = {
    id: '',
    number: '',
    email: '',
    author: false,
    name: '',
    instance_id: '',
    title: ''
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
    const API_URL = process.env.API_URL
    const [user, setUser] = useState(initObj)
    const auth = getAuth(app);

    const {setAuth} = useContext(AuthContext)

    const getUser = async (id: string) => {
        await fetch(`${API_URL}/settings/getuserinfo/${id}`, {
            method: "GET"
        }).then(async(data)=> {
            const res = await data.json()
            if(res.status == 200) {
                setUser({
                    id: res.data.user_id || id,
                    number: res.data.number,
                    email: res.data.email,
                    author: res.data.author == 1 ? true : false,
                    name: res.data.name,
                    instance_id: res.data.instance_id,
                    title: res.data.title
                })
            }
        }).catch((error)=> {
            console.log('caught an error in usercontext: ', error)
        })
    }

    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                // const uid = user.uid;
                console.log('user', user)
                if(user.email){
                    setAuth({
                        isAuth: true,
                        name: user.email,
                        author: false, 
                        id: user.uid
                    })
                    const current: number = new Date().getTime()
                    const created: number = Number(user.metadata.creationTime)
                    // if the account was created more than 3 minutes ago then call getUser
                    // else assume it will be called immediately after the account
                    console.log('before gte user call', user.uid)
                    getUser(user.uid)
                    // if (current - created > 60) {
                    //     console.log('in here??')
                    //     getUser(user.uid)
                    // } else {
                    //     console.log('nope in the other one!')
                    //     setTimeout(()=> {
                    //         getUser(user.uid)
                    //         console.log('does this,,, work???')
                    //     }, 10000)
                    // }
                    // we can set a timer 
                    // or we can call get user immediately after??
                }
            } 
            });
        }, [])


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