import {db, newDoc,updateMeta} from '../CloudAPI/FireBase';
import data from './allData';

// type dbDoc = {
//     identifier: string,
//     description: string,
//     justification: string[],
//     justificationClustered: string[],
//     salutation: string[],
//     closing: string[],
//     selfReference: string[],
//     image: string[],
//     language: string[],
//     format: string[],
//     script: string[],
//     material: string[],
//     businessType: string[],
//     title: string,
//     date: string,
//     latitude: number,
//     longitude: number,
//     spatialCoverage: string[],
//     creator:string,
//     comment: string
// };

// type entryData = {
//     identifier: string,
//     description: string,
//     justification: string,
//     justificationClustered: string,
//     salutation: string,
//     closing: string,
//     selfReference: string,
//     image: string,
//     language: string,
//     format: string,
//     script: string,
//     material: string,
//     businessType: string,
//     title: string,
//     date: string,
//     latitude: string,
//     longitude: string,
//     spatialCoverage: string,
//     creator:string,
//     comment: string
// };

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

const dataTest = [
    {
        identifier: "20200621_084340.jpg",
        "description": "הכניסה מותרת בחבישת מסכה בלבד!!",
        "justification": "",
        "justificationClustered": "",
        "salutation": "",
        "closing": "",
        "selfReference": "",
        "image": "smilly|heart",
        "language": "Hebrew|English",
        "format": "hand written|printed",
        "script": "cursive",
        "material": "paper|pen",
        "businessType": "",
        "title": "2020-06-21 - תל אביב - יפו, הצפון החדש - סביבת ככר המדינה",
        "date": "44003",
        "latitude": "32.0893843",
        "longitude": "34.7826084",
        "spatialCoverage": "148, אבן גבירול, תל אביב - יפו, הצפון החדש - סביבת ככר המדינה, תל אביב-יפו, מחוז תל אביב, ישראל",
        "creator": "Yael Netzer",
        "comment": "HAHAHA comment"
    },
    {
        "identifier": "20200704_174832.jpg",
        "description": "שלום אורחים נכבדים של כלבו אבישי, נא להכנס עם מסיכה בלבד יש לשמור על 2 מטר מרחק אין להכנס בהתקהלות אלא לפי כללי הזהירות נא לשמור על ההנחיות למען ביטחונכם וביטחון הציבור. תודה.",
        "justification": "למען ביטחונכם|ביטחון הציבור",
        "justificationClustered": "למען ביטחונכם|ביטחון הציבור",
        "salutation": "אורחים נכבדים",
        "closing": "תודה",
        "selfReference": "כלבו אבישי",
        "image": "",
        "language": "Hebrew",
        "format": "printed",
        "script": "square",
        "material": "paper|printer",
        "businessType": "חלפן כספים",
        "title": "2020-07-04 - תל אביב - יפו, פלורנטין",
        "date": "44016",
        "latitude": "32.0612607",
        "longitude": "34.7736749",
        "spatialCoverage": "בית שבתאי-מויאל, אלנבי, תל אביב - יפו, פלורנטין, תל אביב-יפו, מחוז תל אביב, ישראל",
        "creator": "Yael Netzer",
        "comment": "",
    }
];

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