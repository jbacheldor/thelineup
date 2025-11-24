

const AddFriend:React.FC = () => {


    return (
        <div id="add-friends">
            <h3>Add Friends</h3>
            <label>
                <span>name</span>
                <input/>
            </label>
            <label>
                <span>email</span>
                <input/>
            </label>
            
            <button>send invite email</button>
            <style jsx>
            {`
                #add-friends {
                    display: flex;
                    flex-direction: column;
                    margin: 20px;
                }
            `}
            </style>
        </div>
    )
}

export default AddFriend;