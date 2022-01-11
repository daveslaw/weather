import './App.css';
import EightDayForecast from './Components/EightDayForecast';
import DailyForecast from './Components/DailyForecast'
import SearchBar from './Components/SearchBar';
// import {toCelcius, toFahrenheit} from './Library/TempConverter';
import { AppContext } from './Context/AppContext';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {

  const [long, setLong] = useState(35.2163);
  const [lat, setLat] = useState(31.769);
  const [weekly, setWeekly] = useState()
  const [city, setCity] = useState("Jerusalem")

  return (
    <AppContext.Provider value={{
      long: long,
      setLong: setLong,
      lat: lat,
      setLat: setLat,
      weekly: weekly,
      setWeekly: setWeekly,
      city: city,
      setCity: setCity,
    }}>
      <div className="App">
        <SearchBar/>
        <EightDayForecast/>
        
        {/* <DailyForecast/> */}
      </div>
    </AppContext.Provider>
  );
}

export default App;
