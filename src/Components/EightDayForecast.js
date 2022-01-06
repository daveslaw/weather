import {React, useState, useEffect} from "react";
import {toCelcius, toFahrenheit} from '../Library/TempConverter';



function EightDayForecast () {

const apiKey = `e19fc65c1da6ed28036f370e2cf8c5ce`;
const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=-26.2023&lon=28.0436&appid=${apiKey}`;

const [forecast, setForecast] = useState();
const [showForecast, setShowForecast] = useState(false);

// const [icon, setIcon] = useState();
// const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

const fetchWeather = () => {
    fetch(oneCallUrl)
    .then((response) => response.json())
    .then(data => {        
        setForecast(data);          
    })
    .catch((error) => {
        console.log(error);
    })
}

useEffect(() => {
    fetchWeather();     
}, []);

useEffect(() => {
    if (forecast) {
        setShowForecast(true);
        console.log(forecast)
    }
}, [forecast] )

return ( 
        <div className="forecast-container">
            
            {showForecast && forecast.daily.map((daily, index) => {
            return (
              <div key= {index} className="forecast-day">                
                  <div >{daily.dt}</div>
                  <div >{daily.sunrise}</div>                  
                
              </div>
            );
          })}
            
            
            
            
           
            
            
            
            
            
            
            <div className="forecast-card">
                {/* Maximum Temperature {toCelcius(forecast.main.temp_max)} */}
            </div>
        </div>
     );
}

export default EightDayForecast ;