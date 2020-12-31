import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCMA16ncj90b8takYyAgTeer45aURZA6yU",
  authDomain: "idobatakaigi-with-ham-48a4f.firebaseapp.com",
  projectId: "idobatakaigi-with-ham-48a4f",
  storageBucket: "idobatakaigi-with-ham-48a4f.appspot.com",
  messagingSenderId: "107894778841",
  appId: "1:107894778841:web:d65b852f1e4812a18907c8"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const messageRef = database.ref('messages');

export const pushMessage = ({ name, text }) => {
  messageRef.push({ name, text });
};