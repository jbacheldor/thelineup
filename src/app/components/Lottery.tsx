
type props = {
    changeLottery: () => void;
}

const Lottery:React.FC<props> = ({changeLottery}) => {

    const submitLottery = (e: any) => {
        e.preventDefault()
    }  

    return (
        <div>
            <div>
                <form id='lottery-form' onSubmit={(e)=>submitLottery(e)}>
                    <button onClick={changeLottery}>x</button>
                    <span>name*</span>
                    <input required></input>
                    <span>number*</span>
                    <input required></input>
                    <span>email*</span>
                    <input required></input>
                    <button>submit</button>
                </form>
            </div>

            <style jsx>
            {`
                #lottery-form {
                    display: flex;
                    flex-direction: column;
                    border: 1px black solid;
                    border-radius: 5px;
                    padding: 10px;
                }
            `}
            </style>
        </div>
    )
}

export default Lottery