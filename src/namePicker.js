import React, {useState, useRef, useEffect} from 'react'
import {FiEdit, FiSave} from "react-icons/fi"

function NamePicker(props) {

    // Manages the "name" state aka setting the new username
    const[name, setName] = useState('')

    // Show the name/input or not
    const [showName, setShowName] = useState(false)

    const inputEl = useRef(null)


    function save() {
        inputEl.current.focus()
        if(name && !showName) {
            props.onSave(name)
        }
        setShowName(!showName)
    }

    useEffect(()=>{
        const n = localStorage.getItem('name')
        if(n) {
            setName(n)
            save()
        }
    }, [])

    return <div className="edit-username">
        
        <input 
            value={name}
            ref={inputEl}
            className="name-input"
            style={{display: showName ? 'none' : 'flex'}}
            onChange={e=> setName(e.target.value)} // e stands for event
            onKeyPress={e=> {
                if(e.key==='Enter') save()
            }}
        />

        {showName && <div>{name}</div>}

        <button className="name-button" onClick={save}>
            {showName ? <FiEdit /> : <FiSave />} 
        </button>

    </div>
}

export default NamePicker