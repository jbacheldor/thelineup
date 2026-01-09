'use client'

import { useState } from "react";

const AddCrushForm:React.FC = () => {
    const [form, setForm] = useState()
    const [pros, setPros] = useState<string[]>()
    const [cons, setCons] = useState<string[]>()

    const dropdownoptions = ['hot', 'graveyard', 'benched', 'in recruitment']
   
    const Test = new Map();

    const updateForm = (e: React.InputEvent) => {

    }

    const submitCrush = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const updateProsOrCons = (e: any) => {
        e.preventDefault()
        // depending on where it is in list - update that
    }
    
    return (
                <div id="add-window">
                    <span className="main-crush-header">
                        <h4>add crush</h4>
                        <button>x</button>
                    </span>
                    <p id="info">once you create this initial instance you can update events and their rank</p>
                    <hr/>
                    <form onSubmit={(e)=>submitCrush(e)}>
                        <label>
                            <p>name</p>
                            <input aria-label={form} value={form} onChange={(e)=>updateForm(e)}></input>
                        </label>
                        <label>
                            <p>status</p>
                            <select aria-label={form} value={form} onChange={(e)=>updateForm(e)}>
                                {dropdownoptions.map((value, index)=> {return <option key={index}>{value}</option>})}
                            </select>
                        </label>
                        <label>
                            <p>description</p>
                            <textarea aria-label={form} value={form} onChange={(e)=>updateForm(e)}></textarea>
                        </label>
                        <div>
                            <div>
                                <label>
                                    <p>pros</p>
                                    <input aria-label={form} value={form} onChange={(e)=>updateForm(e)}></input>
                                </label>
                                <button  onClick={(e)=> updateProsOrCons(e)} >+</button>
                            </div>
                            <div>
                                <label>
                                    <p>cons</p>
                                    <input aria-label={form} value={form} onChange={(e)=>updateForm(e)}></input>
                                </label>
                                <button onClick={(e)=> updateProsOrCons(e)}>+</button>
                             </div>
                        </div>
                        <hr/>
                        <button id="submit">submit</button>
                    </form>
                    <style jsx>
                        {`
                            #add-window {
                                position: absolute;
                                top: 20%;
                                background-color: #eee8d8;
                                width: 400px;
                                text-align: center;
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                padding: 5px;
                                border-left: 1px white solid;
                                border-top: 1px white solid;
                                border-bottom: 1px grey solid;
                                border-right: 1px grey solid;
                            }
                            form {
                                width: 100%;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                            }
                                h4 {
                                box-shadow: none;
                                }
                            span.main-crush-header {
                                padding: 2px 5px;
                                width: 100%;
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                justify-content: space-between;
                                background-image: linear-gradient(180deg, #0154e7 , #bacae7);
                                color: white;
                                border-bottom: 1px #959595 solid;
                                border-top: 1px solid white;
                                box-shadow: 1px 1px #959595;
                                /* box-shadow: 1px 1px #959595; */
                            }
                            p#info {
                                padding-top: 10px;
                                font-weight: 600;
                            }
                            hr {
                                background-color: #949494;
                                width: 80%;
                                border: none;
                                height: 1px;
                                border-radius: 2px;
                                margin: 10px;
                            }
                            #submit {
                                margin: 5px;
                                padding: 3px;
                                width: fit-content;

                            }
                        `}
                    </style>
                </div>
    )
}
export default AddCrushForm;