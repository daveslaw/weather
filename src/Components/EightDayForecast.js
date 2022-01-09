import {React, useState, useEffect} from "react";
import {toCelcius, toFahrenheit} from '../Library/TempConverter';



function EightDayForecast () {

const apiKey = `e19fc65c1da6ed28036f370e2cf8c5ce`;
const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=-26.2023&lon=28.0436&appid=${apiKey}`;

const [forecast, setForecast] = useState();
const [showForecast, setShowForecast] = useState(false);

const [icon, setIcon] = useState();
const [iconArray, setIconArray] = useState([]);
const [iconUrlArray, setIconUrlArray] = useState([]);;
const [urlController, setUrlController] = useState(false);

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
        // console.log(forecast.daily[0].weather[0].icon)
    }
}, [forecast] )

useEffect(() => {
    
    if (forecast) {
        for (let i = 0; i < forecast.daily.length; i++) {
            setIconArray(iconArray.push(forecast.daily[i].weather[0].icon));
        }
    }
    
    console.log(iconArray)
    
}, [forecast])

useEffect(() => {
    if (forecast) {
        for (let i = 0; i < iconArray.length; i++) {
            setIconUrlArray(iconUrlArray.push(`http://openweathermap.org/img/wn/${iconArray[i]}@2x.png`));
            
        }
    }
    
    if (iconUrlArray.length) {
    setUrlController(true);
    console.log(iconUrlArray)
    }
   
})
return ( 
        <div className="forecast-container">
            
            {showForecast && forecast.daily.map((daily, index) => {
            return (
              <div key= {index} className="forecast-day">                
                  <div >{daily.dt}</div>
                  <div >{daily.sunrise}</div>
                  {/* <img  src="http://openweathermap.org/img/wn/${icon}@2x.png"></img>     */}
                
              </div>
            );
          })}

          
            
            
            
            
           
            
            
            
            
            
            
            <div className="forecast-card">
                {/* Maximum Temperature {toCelcius(forecast.main.temp_max)} */}
            </div>
            {urlController && <img src={iconUrlArray[1]}></img>}
        </div>
     );
}

export default EightDayForecast ;