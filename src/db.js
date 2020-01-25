import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) { // a hook is any function that returns something; within a hook u can use other hooks
    const [messages, setMessages] = useState([])

    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds) // sort messages by time
            return msgs
        })
    }

    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id)) // if we wanna delete messages
    }

    useEffect(() => {
        store.collection(coll)
        .where('room','==',room) // only get messages for this specific room
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
  apiKey: "AIzaSyBfJPaYNpdshdAbJu80uUkAN8-fuZ-iySo",
  authDomain: "cheddarapp2020.firebaseapp.com",
  databaseURL: "https://cheddarapp2020.firebaseio.com",
  projectId: "cheddarapp2020",
  storageBucket: "cheddarapp2020.appspot.com",
  messagingSenderId: "980516282556",
  appId: "1:980516282556:web:7e2f04f5a288043c5270b9",
  measurementId: "G-GTJ380GQVS"
}

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()