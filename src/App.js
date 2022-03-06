import logo from './logo.svg';
import './App.css';
import { getData } from './CloudAPI';
import {Json2DbDoc} from './CloudAPI/db.tsx';
import { GetTeiDoc} from './Components/TEI/TeiHeader';
import { GetTeiText} from './Components/TEI/TeiText';

function App() {
  const data = getData();
  console.log(data);
  for( let entry in data){
    // console.log(Json2DbDoc(data[entry]));
    GetTeiDoc(Json2DbDoc(data[entry]));
    // console.log(GetTeiText(Json2DbDoc(data[entry])).end({ pretty: true}));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
