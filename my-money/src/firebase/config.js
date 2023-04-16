import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDojkgO74WlaJ2R_r7NDQ05fBEhbGbaVjg",
    authDomain: "mymoney-49229.firebaseapp.com",
    projectId: "mymoney-49229",
    storageBucket: "mymoney-49229.appspot.com",
    messagingSenderId: "604187261269",
    appId: "1:604187261269:web:ed8b33e0309c7a2ebf17dc"
  }

// init firebase
firebase.initializeApp(firebaseConfig)

// init service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }