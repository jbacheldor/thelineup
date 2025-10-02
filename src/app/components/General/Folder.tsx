
type Props = {
    onClickEvent: () => void;
    text: string,
    label?: string,
}

const Folder:React.FC<Props> = ({onClickEvent, text}) => {

    return (
        <div id="folder">
                <img src={"/closed-folder.svg"} onClick={onClickEvent}/>
                <p>{text}</p>
            <style jsx>
            {`
                #folder {
                    margin: 5px;
                    padding: 10px;
                }
                #folder:hover {
                    cursor: pointer;
                }
            `}
            </style>
        </div>
    )
}

export default Folder;