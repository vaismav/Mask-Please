import { dbDoc } from "../../CloudAPI/PrepareData";
import { GetTeiText } from "./TeiText";
var builder = require('xmlbuilder');


const GetAddressDocument = (entryData:dbDoc):any =>{
    var address = builder.create('address');
    entryData.spatialCoverage.forEach(str =>  
        address.importDocument(
            builder.create('addrLine').txt(str)
        ));
    return address;   
}

const GetRespStmt = (entryData:dbDoc):any =>{
    var output = builder.create('respStmt');

    output.ele('resp').txt('Data collected by');
    output.ele('persName').txt(entryData.creator);
    //comment
    if(entryData.comment) { output.ele('annotation').txt(entryData.comment)}
    
    return output;   
}

const GetTitleStmt = (entryData:dbDoc):any =>{
    var output = builder.create('titleStmt');

    output.ele('title').txt(entryData.title);
    output.ele('title').att('identifier',entryData.identifier).txt(entryData.title);
    output.ele('date').txt(entryData.date);
    //data responsibility 
    output.importDocument(GetRespStmt(entryData));
    
    
    return output;   
}

const GetSourceDec = (entryData:dbDoc):any =>{
    var output = builder.create('sourceDesc');
    //metadata
    entryData.format.forEach(str =>  output.importDocument( 
        builder.create('format').txt(str))
    );
    entryData.script.forEach(str =>  output.importDocument( 
        builder.create('script').txt(str))
    );
    entryData.material.forEach(str =>  output.importDocument( 
        builder.create('material').txt(str))
    );
    entryData.image.forEach(str =>  output.importDocument( 
        builder.create('figure').ele('figDesc').txt(str))
    );
    return output
}

const GetPublicationStmt = (entryData:dbDoc):any =>{
    var output = builder.create('publicationStmt');
    //location
    output.importDocument(GetAddressDocument(entryData));
    output.ele('geo').txt(`${entryData.latitude}, ${entryData.longitude}`);

    output.ele('date').txt(entryData.date);

    //Language
    entryData.language.forEach(lang =>  
        // inserting child element
        output.importDocument(
            // building the child element
            builder.create('language').txt(lang)
        )
    );
    //businessType

    entryData.businessType.forEach(str => output.importDocument(
        builder.create('ref').att('type','businessType').txt(str)
    )); 
    
    

    
  
    
    
    return output;   
}

const GetTeiHeader = (entryData:dbDoc):string =>{
    var fileDesc = builder.create('fileDesc');
    
    fileDesc.importDocument(GetTitleStmt(entryData));
    fileDesc.importDocument(GetPublicationStmt(entryData));
    fileDesc.importDocument(GetSourceDec(entryData));

    let root = builder.create('teiHeader').importDocument(fileDesc);
    // console.log(root.end({ pretty: true}));
       
      return root;
}

const GetTeiDoc = (entryData:dbDoc):string =>{
    try{
        let output = builder.create('TEI').att({xmlns:'http://www.tei-c.org/ns/1.0'});
    
        output.importDocument(GetTeiHeader(entryData));
        // output.raw('texitext')
        output.importDocument(GetTeiText(entryData));

        // console.log(output.end({ pretty: true}));
        return output.end({ pretty: true});
    }
    catch(e){
        console.log(e);
        return "Error occurred";
    }
}

export {GetTeiHeader, GetTeiDoc};