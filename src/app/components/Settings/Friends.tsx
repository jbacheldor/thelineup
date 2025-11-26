'use clients'

import { useEffect, useState } from "react"

export type FriendType = {
    name: string,
    user_id: string,
}

export type FriendsType = FriendType[];

type Props = {
    friendList: FriendsType
}

const Friends:React.FC<Props> = (Props) => {
    const {friendList} = Props
    const [friends, setFriends] = useState<FriendType[]>(friendList)
    const [removedFriends, setRemoved] = useState<FriendType[]>([])
    const [saveDisabled, setSave] = useState(true)


    const removeFriend = (friend: FriendType) => {
        const newFriends = friends.filter((e)=>  e.user_id!=friend.user_id)
        setFriends(newFriends)
        setRemoved([...removedFriends, friend])
    }

    const addFriend = (friend: FriendType) => {
        const removed = removedFriends.filter((e)=> e.user_id!=friend.user_id)
        setRemoved(removed)
        setFriends([...friends, friend])
    }

    useEffect(()=> {
        if(friendList.length == friends.length) setSave(true)
        else setSave(false)
    }, [friends])

    return (
        <div id="friend-settings">
                <h3>Friend List:</h3>
                {friends.map((val, index)=> (
                    <div id="friend" key={index}>
                        <button onClick={()=>removeFriend(val)}>-</button>
                        <img id="friend-pic" src="./old-windows-screen-saver.jpg"/>
                        <p>{val.name}</p>
                    </div>
                ))}
                {removedFriends.length > 0 && 
                    <h3>Removed Friend List:</h3>
                }
                {removedFriends.map((val, index)=> (
                    <div id="friend" key={index}>
                        <button onClick={()=>addFriend(val)}>+</button>
                        <img id="friend-pic" src="./old-windows-screen-saver.jpg"/>
                        <p>{val.name}</p>
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