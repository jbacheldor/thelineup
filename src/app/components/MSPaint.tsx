import { useEffect, useRef, useState } from "react"

type ColorSwatchProps = {
    color: string,
    setColor: (color: string) => void,
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
        'pp': '#FF0080',
        'o': '#FF8040'
}

type MSPaintProps = {
    onClose: () => void;
}

const MSPaint: React.FC<MSPaintProps> = ({onClose}) => {
    const [color, setColor] = useState('black')
    const [tool, setTool] = useState('fill')
    const canvasRef = useRef<HTMLCanvasElement>(null)

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
        setColor(color)
    }

    const onDraw = (e: MouseEvent) => {
        //if drag it will be different than a dot
        console.log('current', canvasRef.current)
        console.log('event', e)
        if(!canvasRef.current) return
        const ctx = canvasRef.current.getContext("2d");
        if(!ctx)return
        ctx.strokeStyle = color

        // just what ya see when the page loads
        console.log('window.innerHeight', window.innerHeight)
        console.log('window.innerWidth', window.innerWidth)


        // these aren't helpful for wat we need
        // console.log('window.screenX', window.screenX)
        // console.log('window.screenY', window.screenY)

        // the potential for scroll woah!
        console.log('window.scrollx', window.scrollX)
        console.log('window.scrolly', window.scrollY)

        // don't tihnk these are helpful for us

        // console.log(' window.screenTop', window.screenTop)
        // console.log('window.screenLeft', window.screenLeft)

        console.log('target scroll top', e.target.scrollTop)
        console.log('e.target.ScrollLeft', e.target.scrollLeft)

        // this is liek  so tricky 
        // is it just a clikc or a click and drag,, hmmm

        console.log('calcualtion height', window.innerHeight-e.target?.offsetHeight)

        ctx.fillStyle = color

        // this is the height & width of the element
        console.log('e,atrget offsetWidth', e.target?.offsetWidth)
        console.log('e,atrget offsetWidth', e.target?.offsetHeight)

        console.log('wat is ex', e.clientX)
        console.log('wat is eY', e.clientY)

        ctx.fillRect(10, 10,10,10)
        // ctx.moveTo(0, 0);
        // ctx.lineTo(200, 100);
        // ctx.stroke();
    }

    const onNew = () => {
        if(!canvasRef.current) return
        const ctx = canvasRef.current.getContext("2d");
        if(!ctx)return
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    const onDrag = () => {

    }

    const onCanvasReact = (e: MouseEvent<HTMLCanvasElement, MouseEvent>) => {

        switch(tool){
            case 'fill':
                onFill()
                break
            case 'draw':
                onDraw(e)
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
                <button onClick={()=>onNew()}>new</button>
            </div>
            <button onClick={onClose}>exit</button>
        </div>
        <div id="toolkit">
            <div id='buttons'>
                <button id={`button${tool !== 'erase' ? "": "-selected"}`} onClick={()=>setTool('erase')}>erase</button>
                <button id={`button${tool !== 'draw' ? "": "-selected"}`} onClick={()=>setTool('draw')}>draw</button>
                <button id={`button${tool !== 'fill' ? "": "-selected"}`} onClick={()=>setTool('fill')}>fill</button>
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
            #button-selected {
                background-color: orange;
            }
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
                background-color: white;
                height: inherit;
                width: inherit;
            }
            canvas {
                width: inherit;
                height: inherit;
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