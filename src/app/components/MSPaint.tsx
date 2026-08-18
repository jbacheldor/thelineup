import { useEffect, useRef } from "react"


const MSPaint: React.FC = () => {
    const canvasRef = useRef(null)

    const getMousePosition = (e: MouseEvent) => {
        const {clientX, clientY} = e
        if(canvasRef.current){
            const {height, width} = canvasRef.current
        }
    } 

    const onFill = () => {
        if(canvasRef.current){
            const ctx = canvasRef.current.getContext('2d')
            ctx.fillStyle = "red"
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }

    const onDraw = (e: MouseEvent) => {
        console.log('current', canvasRef.current)
        console.log('event', e)
    }

    return (
        <div id="ms-paint-window"> 
        <div id="header">
            <div>
                <span>icon</span>
                <button>save</button>
                <button>undo</button>
                <button>redo</button>
            </div>
            <button>exit</button>
        </div>
        <div id="toolkit">

        </div>
        <div id="canvas">
            <canvas ref={canvasRef} onClick={(e)=>onFill()}></canvas>
        </div>

        <style jsx>
        {`
            #ms-paint-window {
                position: absolute;
                top: 20%;
                background-color: #eee8d8;
                min-width: 400px;
                left: 100%;
                min-height: 200px;
                display: flex;
                justify-content: flex-start;
                flex-direction: column;
                padding: 10px;
                border-left: 1px white solid;
                border-top: 1px white solid;
                border-bottom: 1px grey solid;
                border-right: 1px grey solid;
            }
            #header {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                max-height: 20px;
            }
            #canvas {
                background-color: rgb(192 192 192);
                height: inherit;
                width: inherit;
            }
        `}
        </style>
        </div>
    )
}

export default MSPaint;