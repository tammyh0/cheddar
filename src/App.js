import React, {useState, useEffect} from 'react'
import './App.css'
import NamePicker from './namePicker.js'
import {db, useDB} from './db'
import { BrowserRouter, Route} from 'react-router-dom'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase"

function App() {
  useEffect(()=>{ 
    const {pathname} = window.location
    if (pathname.length<2) window.location.pathname='home' // if you don't have a slash, then it redirects you to /home
  }, []) // every time you do useEffect, you MUST put the , [] or else it will exceed itself and will reload over and over again
    return <BrowserRouter>
      <Route path="/:room" component={Room}/> 
    </BrowserRouter>
}

function Room(props) {
  // const [messages, setMessages] = useState([])
  const {room} = props.match.params
  const [name, setName] = useState('')
  const messages = useDB(room)

  // useEffect(()=>{
  //  db.listen({ // we're gonna listen everytime the database changes aka when a new message is added
  //    receive: m=> { 
  //      setMessages(current=> [m, ...current]) // gives us the current state of messages and add the new message to the current messages array
  //    },
  //  })
  //}, [])

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
      return <div key={i} className="message-wrap"
        from={m.name===name?'me':'you'}> 
        <div className="message">
          <div className="msg-name">{m.name}</div>
          <div className="msg-text">{m.text}</div>
        </div>
      </div>
    })}
  </div>

  {/* <button onClick={()=> alert('wtf i told u not to click it')}>
    Don't click here
  </button> */}


  {/* Blue curly braces = entering JS from HTML; white curly braces = block or a function body */}
  <TextInput onSend={(text)=> { // Fat arrow means it's a function that's receiving a single argument on its left; it's what you passed into props.onSend below
    db.send({ // we wanna send it to the database instead of storing locally if we wanna communicate with real other ppl
      text, name, ts: new Date(), room
    })
  }} />

  </main>
}

function TextInput(props){
  const [text, setText] = useState('')

  return <div className="text-input-wrap">
    <input 
      className="text-input"
      value={text} 
      placeholder="  Type your cheesy message..."
      onChange={e=> setText(e.target.value)}
      onKeyPress={e=> {
        if(e.key==='Enter') {
          if(text) props.onSend(text)
          setText('')
        }
      }}
    />
    <button onClick={()=> {
      if(text) props.onSend(text)
      setText('') // changing the text back to empty, which controls the input value
    }} className="button"
      disabled={!text}>
      Send

    </button>
  </div>
}

{/* comment for html */}
// comment for js


export default App
