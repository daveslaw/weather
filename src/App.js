import './App.css';
import EightDayForecast from './Components/EightDayForecast';
import DailyForecast from './Components/DailyForecast'
import {toCelcius, toFahrenheit} from './Library/TempConverter';



function App() {
  return (
    <div className="App">
      <EightDayForecast/>
      {/* <DailyForecast/> */}
    </div>
  );
}

export default App;
