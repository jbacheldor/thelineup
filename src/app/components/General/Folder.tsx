import Image from "next/image";

type Props = {
    onClickEvent: () => void;
    text: string,
    label?: string,
}

const Folder:React.FC<Props> = ({onClickEvent, text}) => {

    return (
        <div id="folder" style={{"margin": "5px","padding": "10px"}}>
            <Image alt="folder navigation button" width={84} height={65} style={{"width": "84px", "height": "65px"}} className="folder-img" src={"/closed-folder.svg"} onClick={onClickEvent}/>
                <p>{text}</p>
            <style jsx>
            {`
                #folder:hover {
                    cursor: pointer;
                }
            `}
            </style>
        </div>
    )
}

export default Folder;