import { dbDoc } from "CloudAPI/PrepareData";

type SetsObject = { 
    justification: Set<string>,
    justificationClustered: Set<string>,
    salutation: Set<string>,
    closing: Set<string>,
    selfReference: Set<string>,
    image: Set<string>,
    language: Set<string>,
    format: Set<string>,
    script: Set<string>,
    material: Set<string>,
    businessType: Set<string>,
}

const CreateSet = (attributeName:string, docArray:dbDoc[]):Set<string> => {
    let output:Set<string> = new Set()
    docArray.forEach(doc => {
        if(doc[attributeName] && Array.isArray(doc[attributeName])){
            doc[attributeName].forEach(value => output.add(value))
        } 
    })   
    // console.log(output);
    return output;
}

const CreateEmptySetsObject = ():SetsObject => ({
    justification: new Set(),
    justificationClustered: new Set(),
    salutation: new Set(),
    closing: new Set(),
    selfReference: new Set(),
    image: new Set(),
    language: new Set(),
    format: new Set(),
    script: new Set(),
    material: new Set(),
    businessType: new Set(),
})

const CreateSetsObject = (docArray:dbDoc[]):SetsObject => {
    let output = CreateEmptySetsObject();
    Object.keys(output).forEach(key => output[key] = CreateSet(key,docArray) );
    return output;
}

export default CreateSet;

export {CreateSetsObject};