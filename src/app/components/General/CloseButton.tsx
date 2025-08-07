
type Props = {
    onClickEvent?: (()=> void);
    text: string,
    disabled?: boolean,
    type: string,
}

const CloseButton:React.FC<Props> = ({onClickEvent, text, disabled, type}) => {

    return (
        <button disabled={disabled} onClick={onClickEvent} className={type == "close" ? "close" : "other"}>
            {text}
            <style jsx>
                {`
                button {
                    border-top: 2px solid  #7DF9FF;
                    border-left:2px solid #7DF9FF;
                    border-bottom:2px solid  #A899E6;
                    border-right:2px solid  #A899E6;
                }
                button:hover {
                    cursor: pointer;
                }
                .close {
                    padding: 0 4px;
                }
                .other {
                    margin: 10px 0;
                    align-self: center;
                    padding: 5px;
                }
                `}
            </style>
        </button>
    )
}

export default CloseButton