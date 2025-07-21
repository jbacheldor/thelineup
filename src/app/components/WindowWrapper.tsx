import { useEffect, useRef, useState } from "react";
import ArtWindow from "./ArtWindow/ArtWindow";
import WordWindow from "./WordWindow/WordWindow";
import './ArtWindow/ArtWindow.css'

type Props = {
    windowType: string,
    setIsOpen: (value: string)=>void;
    setIsMinimized: (value: any)=>void;

}

const WindowWrapper:React.FC<Props>= (props) => {
    const {windowType, setIsMinimized, setIsOpen} = props;
    const windowRef = useRef(null)
    const [isDrag, setIsDrag] = useState(false)
    const [isDown, setIsDown] = useState(false)
    const [offset, setOffset] = useState([0,0])
    const [originalDragPosition, setOriginalDragPosition] = useState([0,0])
    let location = {
        x: 0,
        y: 0
    }

    // this is for resize!!!
        useEffect(() => {
        const onDrag = (e) =>
        {
            updateWidthAndHeight(e)
        };
          
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', ()=> setIsDrag(false));
        
        
        return () => {
          window.removeEventListener('mousemove', onDrag);
          window.removeEventListener('mouseup', ()=> setIsDrag(false));
        }
      }, [isDrag]);

    let title

    const onExit = () => {
        setIsOpen(windowType);
    }

    const minimize = (e) => {
        location.x = e.target.clientX
        location.y = e.target.clientY
        setIsMinimized(windowRef.current)
    }

    const updateLocation = (e) => {
        // windowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        if (isDown) {
            let mousePosition = {
                x : e.clientX,
                y : e.clientY
        
            };
            windowRef.current.style.left = (mousePosition.x + offset[0]) + 'px';
            windowRef.current.style.top  = (mousePosition.y + offset[1]) + 'px';
        }
    }

    const mouseDown = (e) => {
        setIsDown(true)
        setOffset([
            windowRef.current.offsetLeft - e.clientX,
            windowRef.current.offsetTop - e.clientY])
    }

    const mouseUp = (e)=> {
        setIsDown(false)
        setIsDrag(false)
    }

    const mouseOut = (e) => {
        e.preventDefault()
        setIsDown(false)
    }

    // section to widen the window!!!

    const mouseDownResize = (e) => {
        setIsDrag(true)
        setOriginalDragPosition([
            e.clientX, 
            e.clientY
        ])
    }

    const updateWidthAndHeight = (e) => {

        if(isDrag){
            const height = windowRef.current.offsetTop + windowRef.current.offsetHeight
            const width = windowRef.current.offsetLeft + windowRef.current.offsetWidth


            // originalDragPosition
            if((e.clientX < originalDragPosition[0] || e.clientY < originalDragPosition[0])){
                // the window is shrinking
                windowRef.current.style.width = windowRef.current.offsetWidth - (width - e.clientX) + 'px';
                windowRef.current.style.height = windowRef.current.offsetHeight - (height - e.clientY) + 'px';


            }else if((originalDragPosition[0] < e.clientX)|| originalDragPosition[1] < e.clientY) {
                 // the window is growing !!!
                windowRef.current.style.width = windowRef.current.offsetWidth + (e.clientX - width) + 'px';
                windowRef.current.style.height = windowRef.current.offsetHeight  + (e.clientY - height) + 'px';
            }
        }
    }


    // switch (windowType){
    //     case 'art':
    //         return <ArtWindow setIsOpen={setIsOpen} setIsMinimized={setIsMinimized}/>
    //     case 'thoughts':
    //         return <WordWindow/>
    // }

    switch (windowType){
        case 'art':
            title = "untitled - Paint"
            break;
        case 'thoughts':
            title = "Document1 - Microsoft Word"
            break;
    }

    const widthVal = windowType == 'art' ? '300px' : '500px'


    return (
        <div className="window-box" id={windowType} ref={windowRef} style={{width: widthVal}}>
        <div id="title-header"  onMouseMove={e => updateLocation(e)} onMouseUp={e=> mouseUp(e)} onMouseDown={e=> mouseDown(e)} onMouseLeave={e=> mouseOut(e)}>
        <span id="title-header">{title}</span>
        <span id="nav-buttons">
            <button onClick={(e)=> minimize(e)}>
                _
            </button>
            <button onClick={onExit}>
                x
            </button>
        </span>
    </div>
    {windowType == 'art' && 
        <ArtWindow setIsOpen={setIsOpen} setIsMinimized={setIsMinimized}/>
        }
        {windowType == 'thoughts' && 
        <WordWindow/>
        }
        <div id="bottom-window">
        <button id="window-adjuster"  onMouseDown={e => mouseDownResize(e)}>//</button>
        </div>
    </div>
    )
}

export default WindowWrapper;