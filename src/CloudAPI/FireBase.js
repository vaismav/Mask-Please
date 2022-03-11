import { initializeApp } from 'firebase/app';
import {getFirestore, addDoc, collection } from 'firebase/firestore';
import firebaseConfigs  from "./envData/firebaseConfigs";

const app = initializeApp(firebaseConfigs);

const db = getFirestore();

const newDoc = async data => {
    try {
    const docRef = await addDoc(collection(db, "docs"), data);
  
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export { db ,newDoc};