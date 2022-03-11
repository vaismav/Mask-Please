import { initializeApp } from 'firebase/app';
import {getFirestore, addDoc, collection ,getDocs} from 'firebase/firestore';
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

const allDocs = () => getDocs(collection(db, "docs")).then(async snapshot =>{
    let output =[]
    await snapshot.forEach( doc => output.push(doc.data()));
    // console.log(output);
    return output;
  }).catch(e => {
    console.log(e);
    return [];
  });

export { db , newDoc, allDocs};