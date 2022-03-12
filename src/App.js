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

function  App() {
  const [data,setData] = useState([]);
  const [metadataObj, setMetadataObj] = useState();
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
    
  },[data])
  

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
          <Grid item>
            <AutocompleteSearch attribute='script' valuesSet={metadataObj['script']} updateValue={()=>{}} />
          </Grid>          
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
