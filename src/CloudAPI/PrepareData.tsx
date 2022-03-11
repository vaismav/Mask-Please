
type dbDoc = {
    identifier: string,
    description: string,
    justification: string[],
    justificationClustered: string[],
    salutation: string[],
    closing: string[],
    selfReference: string[],
    image: string[],
    language: string[],
    format: string[],
    script: string[],
    material: string[],
    businessType: string[],
    title: string,
    date: string,
    latitude: number,
    longitude: number,
    spatialCoverage: string[],
    creator:string,
    comment: string
};

type entryData = {
    identifier: string,
    description: string,
    justification: string,
    justificationClustered: string,
    salutation: string,
    closing: string,
    selfReference: string,
    image: string,
    language: string,
    format: string,
    script: string,
    material: string,
    businessType: string,
    title: string,
    date: string,
    latitude: string,
    longitude: string,
    spatialCoverage: string,
    creator:string,
    comment: string
};

const emptyDbDoc:dbDoc = {
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

const Json2DbDoc = (data:entryData):dbDoc =>{
    let dbDoc:dbDoc = emptyDbDoc;
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

export {Json2DbDoc,entryData,dbDoc};

module.exports = {
    Json2DbDoc
};