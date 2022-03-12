import logo from './logo.svg';
import './App.css';
import { getData, allDocs } from './CloudAPI';
// import {Json2DbDoc} from './CloudAPI/db.tsx';
import { GetTeiDoc} from './Components/TEI/TeiHeader';
import TeiTextElement, { GetTeiText} from './Components/TEI/TeiText';
import DataCard from './Components/DataCard';
import {Stack, Grid,Autocomplete, TextField} from '@mui/material';
import { useEffect, useState } from 'react';
import {update} from './scripts/pushToDb';
import  {CreateSetsObject} from 'utilities/CreateSet';
import AutocompleteSearch from 'Components/AutoComplete';

const initFilters = () => ({
  justification: '',
    justificationClustered: '',
    salutation: '',
    closing: '',
    selfReference: '',
    image: '',
    language: '',
    format: '',
    script: '',
    material: '',
    businessType: '',
})


function  App() {
  const [data,setData] = useState([]);
  const [metadataObj, setMetadataObj] = useState();
  const [filters, setFilters] = useState(initFilters())
  const [justification, setJustification ] = useState('');
  const [salutation, setSalutation ] = useState('');
  const [closing, setClosing ] = useState('');
  const [selfReference, setSelfReference ] = useState('');
  const [language, setLanguage ] = useState('');
  const [format, setFormat ] = useState('');
  const [script, setScript ] = useState('');
  const [material, setMaterial ] = useState('');
  const [businessType, setBusinessType ] = useState('');
  const [filtersSetters, setFiltersSetters] = useState({
    justification: setJustification,
    salutation: setSalutation,
    closing: setClosing,
    selfReference: setSelfReference,
    language: setLanguage,
    format: setFormat,
    script: setScript,
    material: setMaterial,
    businessType: setBusinessType,
  });

  const getFiltersValuesObject = () => ({
    'justification': justification,
    'salutation': salutation,
    'closing': closing,
    'selfReference': selfReference,
    'language': language,
    'format': format,
    'script': script,
    'material': material,
    'businessType': businessType
  });

  const filtersDependencies = [ justification,salutation,closing,selfReference,language,format,script,material,businessType];

  useEffect(async ()=>{
    allDocs().then(res => {console.log(res); setData(res)});
  },[])
  
  useEffect(()=>{
    console.log(data);
    if(data && Array.isArray(data)){
      setMetadataObj(CreateSetsObject(data))
      let obj = CreateSetsObject(data);
      console.log(obj);
    }
    
  },[data]);

  useEffect(()=>{
    console.log(getFiltersValuesObject());
  },filtersDependencies)
  
  const getAutocompleteForFilter = (att) => <Grid item>
      { metadataObj && metadataObj[att] && filtersSetters && filtersSetters[att] &&
        <AutocompleteSearch attribute={att} valuesSet={Array.from(metadataObj[att])} updateValue={filtersSetters[att]} />
      }
    </Grid>


// TODO HERE
  const getFilteredDocs = () =>{
    const filtersObj = getFiltersValuesObject();
    data.filter(doc => {
      return doc && Object.keys(filtersObj).reduce((prev,currKey)=> 
         prev && filtersObj[currKey]? doc[currKey].includes(filtersObj[currKey]) : true
        ,true)  
    })
  }

  console.log(getFilteredDocs());

  return (
    <div className="App">
      {false && <button onClick={update}>update</button>}
      <Stack>
        <div style={{textAlign:"center"}}>
          <h1>Mask Please!</h1>
          <h2> by Yfim and Avishai</h2>
          <h3>Weak Design, Strong TEI!</h3>
        </div>
        <Grid container spacing={2}>
          {
            Object.keys(getFiltersValuesObject()).map(key => getAutocompleteForFilter(key))
          }        
        </Grid>
        <Grid container spacing={1}>
          {data && data.map(e =><Grid item ><DataCard entryDoc={e}/></Grid>)}
          {data && data.map(e =><Grid item ><DataCard entryDoc={e}/></Grid>)}
          {data && data.map(e =><Grid item ><DataCard entryDoc={e}/></Grid>)}
          {data && data.map(e =><Grid item ><DataCard entryDoc={e}/></Grid>)}
          {data && data.map(e =><Grid item ><DataCard entryDoc={e}/></Grid>)}
          {data && data.map(e =><Grid item ><DataCard entryDoc={e}/></Grid>)}
          {data && data.map(e =><Grid item ><DataCard entryDoc={e}/></Grid>)}
          {data && data.map(e =><Grid item ><DataCard entryDoc={e}/></Grid>)}
          {data && data.map(e =><Grid item ><DataCard entryDoc={e}/></Grid>)}

        </Grid>
      </Stack>
      
    </div>
  );
}

export default App;
