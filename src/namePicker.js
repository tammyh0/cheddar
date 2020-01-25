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
            localStorage.setItem('name', name) // when u get ur name (from the userEffect for the first time), ur SETTING it to be your name
        }
        setShowName(!showName)
    }

    useEffect(()=>{ // useEffect lets you store an empty variable (represented by the [] at the end) to put stuff in there and run some arbitrary code; if you put an empty array, it tells that block of code to only run the first time
        const n = localStorage.getItem('name') // localStorage lets you save some data in your browser (when you refresh, ur stuff is still there; such as your login) 
        if(n) {
            setName(n)
            save()
        } // let's check in localStorage for the name. if there's a name, set the username to that and save it within the current browser
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