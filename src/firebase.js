import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv058g17k0HnDl0K2us8jFRcX00F4LDrI",
  authDomain: "instagram-clone-8a76c.firebaseapp.com",
  databaseURL: "https://instagram-clone-8a76c.firebaseio.com",
  projectId: "instagram-clone-8a76c",
  storageBucket: "instagram-clone-8a76c.appspot.com",
  messagingSenderId: "386432163093",
  appId: "1:386432163093:web:5d666dbe42e2cf5d815d1c",
  measurementId: "G-SGEKNL0WT5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
