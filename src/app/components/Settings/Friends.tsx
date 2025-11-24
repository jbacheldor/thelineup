'use clients'

import { useEffect, useState } from "react"

const currentFriends = [
    'George', 'Larry', 'Edmund', 'Lionette', 'Afifah'
]

const Friends:React.FC = () => {
    const [friends, setFriends] = useState(currentFriends)
    const [removedFriends, setRemoved] = useState<string[]>([])
    const [saveDisabled, setSave] = useState(true)

    const removeFriend = (name: string) => {
        const newFriends = friends.filter((e)=>  e!=name)
        setFriends(newFriends)
        setRemoved([...removedFriends, name])
    }

    const addFriend = (name: string) => {
        const removed = removedFriends.filter((e)=> e!=name)
        setRemoved(removed)
        setFriends([...friends, name])
    }

    useEffect(()=> {
        if(currentFriends.length == friends.length) setSave(true)
        else setSave(false)
    }, [friends])

    return (
        <div id="friend-settings">
                <h3>Friend List:</h3>
                {friends.map((val, index)=> (
                    <div id="friend" key={index}>
                        <button onClick={()=>removeFriend(val)}>-</button>
                        <img id="friend-pic" src="./old-windows-screen-saver.jpg"/>
                        <p>{val}</p>
                    </div>
                ))}
                {removedFriends.length > 0 && 
                    <h3>Removed Friend List:</h3>
                }
                {removedFriends.map((val, index)=> (
                    <div id="friend" key={index}>
                        <button onClick={()=>addFriend(val)}>+</button>
                        <img id="friend-pic" src="./old-windows-screen-saver.jpg"/>
                        <p>{val}</p>
                    </div>
                ))}
                <button disabled={saveDisabled}>save</button>
                <style jsx>
                {`
                h3 {
                    padding: 10px;
                    text-decoration: none;
                    text-align: center;
                }
                #friend {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
                #friend-settings {
                    display: flex;
                    flex-direction: column;
                    min-width: 200px;
                }
                #friend-pic {
                    border-radius: 50px;
                    height: 30px;
                    width: 30px;
                    border: 1px solid white;
                    margin: 5px;
                }
                `}
                </style>
            </div>
    )
}

export default Friends;