import React, {useState} from 'react';
import './App.css';

function App() {
  return <main>

  <header>
    <img classname="logo"
      src="https://cdn0.iconfinder.com/data/icons/foody-icons/32/FoodyIcons_color-04-512.png" 
    />
    Cheddar
  </header>

  <TextInput placeholder="Type something..."/>

  {/* <button onClick={()=> alert('wtf i told u not to click it')}>
    Don't click here
  </button> */}

  <TextInput onSend={t=> console.log(t)} />

  </main>
}

function TextInput(props){
  const [text, setText] = useState('')

  return (<div className="text-input">
    <input value={text} 
      placeholder="  Type ur cheesy message..."
      onChange={e=> setText(e.target.value)}
    />
    <button onClick={()=> {
      props.onSend(text)
      setText('')
    }}>
      Send

    </button>
  </div>)
}

{/* comment for html */}
// comment for js


export default App;
