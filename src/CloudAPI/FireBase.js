import { initializeApp } from 'firebase/app';
import {getFirestore, addDoc, collection ,getDocs, query, limit, where} from 'firebase/firestore';
import firebaseConfigs  from "./envData/firebaseConfigs";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const app = initializeApp(firebaseConfigs);
const storage = getStorage();
const db = getFirestore();

const newDoc = async data => {
    try {
    const docRef = await addDoc(collection(db, "docs"), data);
  
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// const allDocs = () => getDocs(collection(db, "docs")).then(async snapshot =>{
//     let output =[]
//     await snapshot.forEach( doc => output.push(doc.data()));
//     // console.log(output);
//     return output;
//   }).catch(e => {
//     console.log(e);
//     return [];
//   });

const allDocs = () => getDocs(query(collection(db, "docs"), where("description", "!=", ""),limit(10))).then(async snapshot =>{
      let output =[]
      await snapshot.forEach( doc => output.push(doc.data()));
      // console.log(output);
      return output;
    }).catch(e => {
      console.log(e);
      return [];
    });

const queryDocs = (queryArray = [],lim=10) => getDocs(query(collection(db, "docs"), ...queryArray, limit(lim))).then(async snapshot =>{
      let output =[]
      await snapshot.forEach( doc => output.push(doc.data()));
      // console.log(output);
      return output;
    }).catch(e => {
      console.log(e);
      return [];
    });

const getImageRef = async path => getDownloadURL(ref(storage, path)).then(url => url).catch((error) => {
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/object-not-found':
      console.log("File doesn't exist");
      break;
    case "storage/unauthorized":
      console.log("User doesn't have permission to access the object");
      break;
    case "storage/canceled":
      console.log("User canceled the upload");
      break;

    // ...

    case "storage/unknown":
      console.log("Unknown error occurred, inspect the server response");
      break;
  }
  return '';
});

export { db , newDoc, allDocs, queryDocs,getImageRef};