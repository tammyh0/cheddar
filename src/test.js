import React, { useState } from 'react'
import { FiEdit, FiSave } from 'react-icons/fi'

function NamePicker(props) {

    const [name, setName] = useState('')

    // Should we show the name instead of input or not
    const [showName, setShowName] = useState(false)

    function save() {
        if (name && !showName) { // if there's a typed in name and the input is showing
            props.onSave(name) // Since typing the input causes the name state to change, then the button component can check for that; save the username
        }
        setShowName(!showName) // Toggle back and forth between showing the new name and the input; switch and toggle to what it's not/the opposite of itself
    }

    return <div>
        {!showName && <input value={name} // IF STATEMENT - If the condition (showName is false aka we're not showing the name) is true, then render the input following the &&
            onChange={e=> setName(e.target.value)} // Whenever the input changes, take 'e' aka what's currently typed in and get the value to store in the 'name' state using 'setName' (passing the input to setName); 'e' stands for event
            onKeyPress={e=> { // onKeyPress means if you're typing ANY key in this input div/component
                if (e.key === 'Enter') { // if that key you're pressing happens to be 'Enter'
                    props.onSave(name) // Saving the username
                }
            }} // Allows you to enter your input by literally pressing the 'Enter' key
        />}

        {showName && <div>{name}</div>} {/* IF STATEMENT - If showName is true aka the name already exists, then just show it */}

        <button onClick={save}> 
            {showName ? <FiEdit /> : <FiSave /> } {/* If the showName is true, show the edit icon. If false and there's the input instead of the username, show the save icon. The ? is basically an if statement. The : is an else statement. */}
        </button>
    </div>
}

export default NamePicker