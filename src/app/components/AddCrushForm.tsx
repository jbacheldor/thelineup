'use client'

import { useState } from "react";

const initialForm: formType = {
    name: '',
    status: 'hot',
    description: '',
    pros: [''],
    cons: ['']
}

type formType = {
    name: string,
    status: string,
    description: string,
    pros: string[],
    cons: string[]
}

const AddCrushForm:React.FC = () => {
    const [form, setForm] = useState<formType>(initialForm)

    const API_URL = process.env.API_URL

    const dropdownoptions = ['hot', 'graveyard', 'benched', 'in recruitment']

    const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.ariaLabel || '']: (e.target as HTMLInputElement | HTMLTextAreaElement).value
        })
    }

    const submitCrush = async (e: React.FormEvent) => {
        e.preventDefault()

        let cons = ''
        let pros = ''
        console.log('consoel.log', form.cons)
        form.cons.forEach((val, index)=> {
            if(cons == '') cons = `${val}`
            else cons = cons + `, ${val}`
        })
        form.pros.forEach((val, index)=> {
            if(pros == '') pros = `${val}`
            else pros = pros + `, ${val}`
        })

        await fetch(`${API_URL}/crush/submitNewCrush`, {
            method: 'POST',
            body: JSON.stringify({
                name: form.name,
                description: form.description,
                status: form.status,
                pros: pros,
                cons: cons,
                instance_id: '1'
            })
        }).then((res)=> {
            if(res.status == 200){
                setForm(initialForm)
            }
        }).catch((error)=>{
            console.error('woooehehehh we caught a live one', error)
        })
        
    }

    const addNew = (e: any, type: string) => {
        e.preventDefault()
        if(type == 'pros') {
            setForm({
                ...form,
                pros: [...form.pros, '']
            })
        }
        else {
            setForm({
                ...form,
                cons: [...form.cons, '']
            })
        }
    }

    const removeList = (e: any, value: string) => {
        e.preventDefault()
        const values = value.split('-')

        if(values[0]=='pros') {
            console.log('testtest', form.pros.filter((val, index)=> index != Number(values[1])))
            setForm({
                ...form,
                pros: form.pros.filter((val, index)=> index != Number(values[1]))
            })
        }
        else{
            setForm({
                ...form,
                cons: form.cons.filter((val, index)=> index != Number(values[1]))
            })
        } 
    }

    const updateProsOrCons = (e: any) => {
        e.preventDefault()
        
        const values = e.target.ariaLabel.split('-')

        if(values[0] == 'pros'){
            const newArr = form.pros.map((val, index)=> {
                if(values[1] == index){
                    return e.target.value
                }
                else {
                    return val
                }
            })
            setForm({
                ...form,
                pros: newArr
            })
        }else {
            const newArr = form.cons.map((val, index)=> {
                if(values[1] == index){
                    return e.target.value
                }
                else {
                    return val
                }
            })
            setForm({
                ...form,
                cons: newArr
            })
        }
        
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
                            <input aria-label='name' value={form.name} onChange={(e)=>updateForm(e)}></input>
                        </label>
                        <label>
                            <p>status</p>
                            <select aria-label='status' value={form.status} onChange={(e)=>updateForm(e)}>
                                {dropdownoptions.map((value, index)=> {return <option key={index}>{value}</option>})}
                            </select>
                        </label>
                        <label>
                            <p>description</p>
                            <textarea aria-label='description' value={form.description} onChange={(e)=>updateForm(e)}></textarea>
                        </label>
                        <div>
                            <div id="lists">
                            <span id="list-header">
                                <p>pros</p>
                                <button onClick={(e)=>addNew(e,'pros')}>+</button>
                            </span>
                                {form.pros?.map((value, key)=> { return (
                                    <label key={'label-'+key}>
                                        <input key={'pros-'+key} aria-label={'pros-'+key} value={form.pros[Number(key)]} onChange={(e)=>updateProsOrCons(e)}></input>
                                        <button onClick={(e)=> removeList(e, `pros-${key}`)} >-</button>
                                    </label>
                                )})}
                            </div>
                            <span id="list-header">
                                <p>cons</p>
                                <button onClick={(e)=>addNew(e,'cons')}>+</button>
                            </span>
                                {form.cons?.map((value, key)=> { return (
                                    <label key={'label-'+key}>
                                        <input key={'cons-'+key} aria-label={'cons-'+key} value={form.cons[Number(key)]} onChange={(e)=>updateProsOrCons(e)}></input>
                                        <button onClick={(e)=> removeList(e, `cons-${key}`)} >-</button>
                                    </label>
                                )})}
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
                            #lists {
                                display: flex;
                                flex-direction: column;
                            }
                            form {
                                width: 100%;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                            }
                            #list-header {
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                justify-content: center;
                            }
                                h4 {
                                box-shadow: none;
                                }
                            input, textarea {
                                padding: 2px;
                                margin: 2px;
                                width: 30ch;
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