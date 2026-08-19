import { useEffect, useRef, useState } from "react"

type ColorSwatchProps = {
    color: string,
    setColor: (color: string) => void
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({color, setColor}) => {
    return (
        <div 
        style={{backgroundColor: color, 
            width: '20px', height: '20px', 
            borderLeft: '1px white solid',
            borderTop: '1px white solid',
            borderBottom: '1px grey solid',
            borderRight: '1px grey solid',
            cursor: 'pointer',
            margin: '1px'
        }}
        onClick={() => setColor(color)}
        ></div>
    )
}

const colorList: Record<string, string> = 
    { 'black': '#000000',
     'grey': ' #808080',
     'burgundy': '#800000',
     'ugly-yellow': "#808000",
     'green': '#008000',
     'teal': '#008080',
     'navy': '#000080',
     'magenta': '#800080',
     'idk-bro': '#808040',
     'uh': '#004040',
     'blue': '#0080FF',
     'other-blue': '#004080',
     'purple': '#4000FF',
     'burnt-orange': '#804000',
    'white': '#FFFFFF',
    'grey2': '#C0C0C0',
        'red': '#FF0000',
        'yellow': '#FFFF00',
        'lime-green': '#00FF00',
        'bright-blue': '#00FFFF',
        'blue2': '#0000FF',
        'pink': '#FF00FF',
        'daffodil': '#FFFF80',
        'green?': '#00FF80',
        'ekekmek': '#80FFFF',
        'p': '#8080FF',
        'pp': '##FF0080',
        'o': '#FF8040'
}

const MSPaint: React.FC = () => {
    const [color, setColor] = useState('black')
    const [tool, setTool] = useState('fill')
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
            ctx.fillStyle = color
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }
    
    const changeColor = (color: string) => {
        console.log('in here', color)
        setColor(color)
    }

    const onDraw = (e: MouseEvent) => {
        console.log('current', canvasRef.current)
        console.log('event', e)
    }

    const onCanvasReact = (e: MouseEvent<HTMLCanvasElement, MouseEvent>) => {

        switch(tool){
            case 'fill':
                onFill()
                break
            case 'draw':
                break
            case 'erase':
                break
        }
    } 

    const onToolChange = () => {

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
            <div id='buttons'>
                <button onClick={()=>setTool('erase')}>erase</button>
                <button onClick={()=>setTool('draw')}>draw</button>
                <button onClick={()=>setTool('fill')}>fill</button>
            </div>
            <div id="current-color">
                <ColorSwatch  setColor={changeColor}  color={color}/>
            </div>
            <div id="palette">
                {Object.entries(colorList).map(([key, value])=> {
                    return <ColorSwatch key={`color-${key}`} setColor={changeColor} color={value}/>
})
            }
            </div>
        </div>
        <div id="canvas">
            <canvas ref={canvasRef} onClick={(e)=>onCanvasReact(e)}></canvas>
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
            #palette {
                display: flex;
                flex-direction: row;
                max-width: calc(22px*14);
                flex-wrap: wrap;
            }
        `}
        </style>
        </div>
    )
}

export default MSPaint;