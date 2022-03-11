import logo from './logo.svg';
import './App.css';
import { getData, allDocs } from './CloudAPI';
// import {Json2DbDoc} from './CloudAPI/db.tsx';
import { GetTeiDoc} from './Components/TEI/TeiHeader';
import TeiTextElement, { GetTeiText} from './Components/TEI/TeiText';
import DataCard from './Components/DataCard';
import {Stack} from '@mui/material';
import { useEffect, useState } from 'react';
import {update} from './scripts/pushToDb';

function  App() {
  const [data,setData] = useState([])
  // const data = getData();
  // console.log(data);
  useEffect(async ()=>{
    allDocs().then(res => {console.log(res); setData(res)});
  },[])
  
  console.log(data);

  return (
    <div className="App">
      {false && <button onClick={update}>update</button>}
      <Stack>
        <div style={{textAlign:"center"}}>
          <h1>Mask Please!</h1>
          <h2> by Yfim and Avishai</h2>
          <h3>Weak Design, Strong TEI!</h3>
        </div>
      
        <Stack direction='row'>
          {data && data.map(e =><div><DataCard entryDoc={e}/></div>)}
        </Stack>
      </Stack>
      
    </div>
  );
}

export default App;
