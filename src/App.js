import React, {useState, useEffect} from 'react'
import './App.css'
import './media.css'
import NamePicker from './namePicker'
import {db, useDB} from './db'
import { BrowserRouter, Route} from 'react-router-dom'
import * as firebase from "firebase/app"
// import "firebase/firestore"
// import "firebase"
import "firebase/storage"
import {FiCamera} from "react-icons/fi"
import Camera from 'react-snap-pic'
import Div100vh from 'react-div-100vh'

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
  const [showCamera, setShowCamera] = useState(false)
  const messages = useDB(room)

  // useEffect(()=>{
  //  db.listen({ // we're gonna listen everytime the database changes aka when a new message is added
  //    receive: m=> { 
  //      setMessages(current=> [m, ...current]) // gives us the current state of messages and add the new message to the current messages array
  //    },
  //  })
  //}, [])

  // console.log(messages)

  async function takePicture(img) { // async means you can use await... which waits for the line of code to be done before running the next line
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7)
    var storageRef = firebase.storage().ref()
    var ref = storageRef.child(imgID + '.jpg')
    await ref.putString(img, 'data_url')
    db.send({ 
      img: imgID, name, ts: new Date(), room 
    })
  }

  return <Div100vh>

  {showCamera && <Camera takePicture={takePicture} />} {/* If the camera is showing/true, then render the actual camera; the takePicture prop means to run the takePicture function */}

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
    {messages.map((m,i)=> <Message key={i} m={m} name={name} />)}  // Map function takes in two arguments: the map item and the index
  </div>

  {/* <button onClick={()=> alert('wtf i told u not to click it')}>
    Don't click here
  </button> */}


  {/* Blue curly braces = entering JS from HTML; white curly braces = block or a function body */}
  <TextInput 
    showCamera={()=>setShowCamera(true)}
    onSend={(text)=> { // Fat arrow means it's a function that's receiving a single argument on its left; it's what you passed into props.onSend below
      db.send({ // we wanna send it to the database instead of storing locally if we wanna communicate with real other ppl
        text, name, ts: new Date(), room
      })
    }} 
  />

  </Div100vh>
}

const bucket = 'https://firebasestorage.googleapis.com/v0/b/cheddarapp2020.appspot.com/o/'
const suffix = '.jpg?alt=media'

function Message({m, name}) {
  return <div className="message-wrap"
  from={m.name===name?'me':'you'}
  onClick={()=> console.log(m)}> 
  <div className="message">
    <div className="msg-name">{m.name}</div>
    <div className="msg-text">
      {m.text}
      {m.img && <img src={bucket + m.img + suffix} alt="pic" />}
    </div> 
  </div>
</div>
}

function TextInput(props){ // props is an object with a bunch of diff things/properties to it, including the showCamera prop
  const [text, setText] = useState('')

  return <div className="text-input-wrap">
    <button onClick={props.showCamera}
      className="camera-button">
      <FiCamera style={{height:15, width:15}} />
    </button>

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
