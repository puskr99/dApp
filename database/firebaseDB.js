import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCI8qism9EsAOSL1PuDZOvAXwJPIun8WeY",
    authDomain: "reactnativefirebase-e502e.firebaseapp.com",
    databaseURL:'https://reactnativefirebase-e502e.firebaseio.com',
    projectId: "reactnativefirebase-e502e",
    storageBucket: "reactnativefirebase-e502e.appspot.com",
    messagingSenderId: "773026104394",
    appId: "1:773026104394:web:8e6058b3d7aedb80d4d2b3",
    measurementId: "G-V10Z7TB3MN"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  const auth = getAuth(app);

  export { db , auth } ;