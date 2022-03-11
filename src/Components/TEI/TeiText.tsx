import React, { FC, ReactElement } from "react";
import { forEachChild } from "typescript";
import { dbDoc } from "../../CloudAPI/PrepareData";
import TeiCloser from "./TeiCloser";
import TeiJustification from "./TeiJustification";
import TeiSalute from "./TeiSalute";
import TeiSelfRef from "./TeiSelfRef";
var builder = require('xmlbuilder');
type textElement = {text:string};
type saluteElement = {salute:any} ;
type closerElement = {closer:any};
type selfRefElement =  {selfRef:any} ;
type justificationElement =  {justification: any} ;

type arrayElement = {
    type: tagString,
    value: string
}

type tagString =  'text'|'salute'|'closer'|'selfRef'|'justification';


const CreateArrayElement = (element:tagString,value:string):arrayElement => ({type: element, value});

const GetTextElementString = (tag:tagString, att:any = {}, value:string ):string =>builder.create(tag).txt(value).att(att).end();


const UpdateElementsArray =  (tag:tagString,  stringArray:string[], body:arrayElement[]):arrayElement[] =>{
    stringArray.forEach(key =>{

        for(let i=0;i< body.length; i++){
            if(body[i].type === 'text'){
                let subArray:arrayElement[] = body[i].value.split(key).map(val => CreateArrayElement('text',val));
                for(let j=1; j<subArray.length; j = j + 2){
                    subArray = subArray.slice(0,j) 
                                .concat([CreateArrayElement(tag,key)])
                                .concat(subArray.slice(j,subArray.length));
                }
                body = body.slice(0,i).concat(subArray).concat(body.slice(i+1,body.length));
            }
        }
    });
    
    return body;
}

const BuildBodyElementsArray = (entryData:dbDoc):arrayElement[] =>{
    let bodyArr = [CreateArrayElement('text',entryData.description)];
    bodyArr = UpdateElementsArray( 'salute', entryData.salutation, bodyArr);
    bodyArr = UpdateElementsArray('selfRef', entryData.selfReference, bodyArr);
    bodyArr = UpdateElementsArray( 'closer', entryData.closing, bodyArr);
    bodyArr = UpdateElementsArray( 'justification', entryData.justification, bodyArr);
    return bodyArr;
}

const GetTeiText = (entryData:dbDoc):any =>{
    let bodyArray:arrayElement[] = BuildBodyElementsArray(entryData);
    let body = builder.create('body');
    
    bodyArray.forEach(element => {
        switch(element.type){
            case 'text':
                body.raw(element.value);
                break;
            case 'selfRef':
                body.ele('ref').att({type:'selfReference'}).txt(element.value);
                break;
            case 'justification':
                body.ele('ref').att({type:'justification'}).txt(element.value);
                break;
            default: //closer|salute
                body.ele(element.type).txt(element.value);
                break;
        }

    })
    
       
      return builder.create('text').importDocument(body);
    // return "";
}

const GetReactElement = (element: arrayElement):ReactElement =>{
    switch(element.type){
        case 'closer':
            return <TeiCloser value={element.value}/>;
        case 'salute':
            return <TeiSalute value={element.value}/>;
        case 'selfRef':
            return <TeiSelfRef value={element.value}/>;
        case 'justification':
            return <TeiJustification value={element.value}/>;
        default: //closer|salute
            return <>{element.value}</>;
    }
}

const TeiTextElement: FC<{entryData:dbDoc}> = ({ entryData}: {entryData:dbDoc}): ReactElement => {
    let bodyArray:arrayElement[] = BuildBodyElementsArray(entryData);
    
       console.log('before render');
      return <div>{bodyArray.map(element => GetReactElement(element))}</div>;
}

export default TeiTextElement;
export {GetTeiText};