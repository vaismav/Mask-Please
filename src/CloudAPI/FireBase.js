import { initializeApp } from 'firebase/app';
import {getFirestore, addDoc, collection ,getDocs, query, limit, where, doc, setDoc, getDoc} from 'firebase/firestore';
import firebaseConfigs  from "./envData/firebaseConfigs";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const app = initializeApp(firebaseConfigs);
const storage = getStorage();
const db = getFirestore();

const newDoc = async (data) => {
    try {
    const docRef = await addDoc(collection(db, "docs"), data);
  
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const updateMeta = async (data) => {
  console.log('try to update meta');
  try {
    const docRef = await setDoc(doc(db, "meta", "data"), data);
  
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  console.log('post try to update meta');
}

const getMetaData = async () => {
  const docSnap = await getDoc(doc(db, "meta", "data"));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return {};
  }
}


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
  if(false){
    switch (error.code) {
      case 'storage/object-not-found':
        console.error("File doesn't exist");
        break;
      case "storage/unauthorized":
        console.error("User doesn't have permission to access the object");
        break;
      case "storage/canceled":
        console.error("User canceled the upload");
        break;
  
      // ...
  
      case "storage/unknown":
        console.error("Unknown error occurred, inspect the server response");
        break;
    }
  }
  
  return '';
});

export { db , newDoc, allDocs, queryDocs,getImageRef, where,updateMeta, getMetaData};