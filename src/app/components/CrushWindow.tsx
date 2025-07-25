import React from 'react';
import './style.css'
import ShowUpdateWindow from './ShowUpdateWindow';
// import { ReactComponent as MinimizeIcon }  from '../../assets/minimize-8.svg';

type Props = {
    // theme?: string;
    crushName?: string;
    onSelect: () => void;
    showProfile: () => void;
    closeWindows?: boolean;
}


function CrushWindows(props: Props) {
    const {crushName, onSelect, showProfile, closeWindows} = props;
    const [showWindow, setShowWindow] = React.useState(false)

    const showUpdate = () => {
        onSelect()
        setShowWindow(true)
    }

    const onCloseWindow = () => {
        setShowWindow(false)
    }

    return (
        <div className="crush-group">
        <div className="main-crush-window">
        {/* <MinimizeIcon/> */}
        <span className="main-crush-header">
            <span className="crush-name">{crushName ? crushName : "Billy Bob"}</span>
            {/* <MinimizeIcon/> */}
            <span className="buttons">
                <button><span>_</span></button>
                <button><span>|_|</span></button>
                <button><span>x</span></button>
            </span>
        </span>
        <hr className="crush-divider"/>
        <div className="crush-picture"></div>
        <hr className="crush-divider"/>
        <div>
            <button>
                approve
            </button>
            <button>
                veto
            </button>
            <button onClick={showUpdate}>
                show updates
            </button>
        </div>
        </div>
        {showWindow && closeWindows && <ShowUpdateWindow crushName={crushName} closeWindow={onCloseWindow} showProfile={showProfile}/>}
        </div>
    );
}
export default CrushWindows