import './App.css';
import Apicall from './Components/Apicall';
import {toCelcius, toFahrenheit} from './Library/TempConverter';



function App() {
  return (
    <div className="App">
      <Apicall/>
    </div>
  );
}

export default App;
