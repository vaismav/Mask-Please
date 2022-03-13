import {newDoc,updateMeta} from '../CloudAPI/FireBase';
import data from './allData';


const emptyDbDoc = {
    identifier: "",
    description: "",
    justification: [],
    justificationClustered: [],
    salutation: [],
    closing: [],
    selfReference: [],
    image: [],
    language: [],
    format: [],
    script: [],
    material: [],
    businessType: [],
    title: "",
    date: "",
    latitude: 0.0,
    longitude: 0.0,
    spatialCoverage: [],
    creator:"",
    comment: ""
}

const Json2DbDoc = (data) =>{
    let dbDoc = emptyDbDoc;
    Object.keys(data).forEach(key =>{
        switch(key){
            case "identifier":
            case 'comment':
            case  'creator': 
            case  'date': 
            case  'title': 
            case 'description':
                dbDoc[key] = data[key];
                break;
            case 'spatialCoverage':
                dbDoc[key] = data[key].split(",");
                break;

            case  'latitude' : 
            case 'longitude'  : 
                dbDoc[key] = parseFloat(data[key]);
                break;
            default:
                dbDoc[key] = data[key] ? data[key].split('|') : [];
        }
    })

    return dbDoc;
}

const update = () => {

        data.forEach(entry => {
        newDoc(Json2DbDoc(entry));
    });
}

const updateMetaData = () => {
    let metaData = {
        justification: [],
        salutation: [],
        closing: [],
        selfReference: [],
        image: [],
        language: [],
        format: [],
        script: [],
        material: [],
        businessType: [],
    };
    data.forEach(entry => {
        let dbDoc = Json2DbDoc(entry);
        for(let key in metaData){
            metaData[key] = metaData[key].concat(dbDoc[key])
        }

    });
    for(let key in metaData){
        metaData[key] = [...new Set(metaData[key])];
    }
    console.log(metaData);
    updateMeta(metaData);
}

export { update, updateMetaData};