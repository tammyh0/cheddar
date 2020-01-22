import React, {useState} from 'react'
import './App.css'
import './namePicker.js'
import NamePicker from './namePicker.js'

function App() {
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('')

  // console.log(messages)
  return <main>

  {/* The HTML doesn't start til the word return. Everything before return is JS */}
  <header>
    <div className="logo-wrap">
      <img className="logo"
        src="https://cdn0.iconfinder.com/data/icons/foody-icons/32/FoodyIcons_color-04-512.png" 
      />
      C H E D D A R
    </div>

    <NamePicker onSave={setName} />
  </header>

  <div className="messages"> 
    {messages.map((m,i)=>{  // Map function takes in two arguments: the map item and the index
      return <div key={i} className="message-wrap">
          <div className="message">{m}</div>
        </div>
    })}
  </div>

  {/* <button onClick={()=> alert('wtf i told u not to click it')}>
    Don't click here
  </button> */}


  {/* Blue curly braces = entering JS from HTML; white curly braces = block or a function body */}
  <TextInput onSend={text=> { // Fat arrow means it's a function that's receiving a single argument on its left; it's what you passed into props.onSend below
    setMessages([text, ...messages])
  }} />

  </main>
}

function TextInput(props){
  const [text, setText] = useState('')

  return <div className="text-input">
    <input 
      className="msg-input"
      value={text} 
      placeholder="  Type your cheesy message..."
      onChange={e=> setText(e.target.value)}
    />
    <button className="send-button" onClick={()=> {
      if(text){
      props.onSend(text)
      }
      setText('') // changing the text back to empty, which controls the input value
    }} className="send-button"
      disabled={!text}>
      Send

    </button>
  </div>
}

{/* comment for html */}
// comment for js


export default App
