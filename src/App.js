import logo from './logo.svg';
import './App.css';
import { getData } from './CloudAPI';
import {Json2DbDoc} from './CloudAPI/db.tsx';
import { GetTeiDoc} from './Components/TEI/TeiHeader';
import TeiTextElement, { GetTeiText} from './Components/TEI/TeiText';

function App() {
  const data = getData();
  console.log(data);
  let output = [];
  for( let entry in data){
    // console.log(Json2DbDoc(data[entry]));
    output.push(<TeiTextElement entryData={Json2DbDoc(data[entry])}/>);
    // console.log(GetTeiText(Json2DbDoc(data[entry])).end({ pretty: true}));
  }

  return (
    <div className="App">
      {output}
    </div>
  );
}

export default App;
