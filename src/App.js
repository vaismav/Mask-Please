import { queryDocs,where , getMetaData} from './CloudAPI';
import DataCard from './Components/DataCard';
import {Stack, Grid, Slider} from '@mui/material';
import { useEffect, useState } from 'react';
import {update, updateMetaData} from './scripts/pushToDb';
import AutocompleteSearch from 'Components/AutoComplete';




function  App() {
  const [data,setData] = useState([]);
  const [metadataObj, setMetadataObj] = useState();
  const [numberOfItems, setNumberOfItems] = useState(10);
  const [lastQuery, setLastQuery] = useState([where('description',"!=","")]);
  const [justification, setJustification ] = useState('');
  const [salutation, setSalutation ] = useState('');
  const [closing, setClosing ] = useState('');
  const [selfReference, setSelfReference ] = useState('');
  const [language, setLanguage ] = useState('');
  const [format, setFormat ] = useState('');
  const [script, setScript ] = useState('');
  const [material, setMaterial ] = useState('');
  const [businessType, setBusinessType ] = useState('');
  const [filtersSetters] = useState({
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

  useEffect(()=>{
    getMetaData().then(res => setMetadataObj(res));
  },[])

  useEffect(()=>{
    queryDocs( lastQuery,numberOfItems )
        .then(res => {console.log(res); setData(res)});
  },[lastQuery,numberOfItems])

  const updateFilterValue = (value,att) =>{
    filtersSetters[att](value);
    setLastQuery([where('description',"!=",""),where(att,"array-contains",value)])
  }

  const getAutocompleteForFilter = (att) => <Grid item>
      { metadataObj && metadataObj[att] && filtersSetters && filtersSetters[att] &&
        <AutocompleteSearch attribute={att} valuesSet={Array.from(metadataObj[att])} updateValue={(value) => updateFilterValue(value, att)} />
      }
    </Grid>

  const handleItemsNumberChange = e => {
    e.preventDefault();
    setNumberOfItems(e.target.value? e.target.value : 1);
  }


  return (
    <div className="App">
      {false && <button onClick={update}>update</button>}
      {false && <button onClick={updateMetaData}>updateMetaData</button>}
      <Stack>
        <div style={{textAlign:"center"}}>
          <h1>Mask Please!</h1>
          <h2> by Yfim and Avishai</h2>
          <h3>Weak Design, Strong TEI!</h3>
        </div>
        <Grid container spacing={2}>
          <Grid item>
          <Slider defaultValue={numberOfItems} aria-label="Number Of Items" valueLabelDisplay="on" onChange={handleItemsNumberChange} /> number of items
          </Grid>
          
          {
            Object.keys(getFiltersValuesObject()).map(key => getAutocompleteForFilter(key))
          }        
        </Grid>
        <Grid container spacing={1}>
          {data && data.map(e =><Grid item ><DataCard entryDoc={e}/></Grid>)}

        </Grid>
      </Stack>
      
    </div>
  );
}

export default App;
