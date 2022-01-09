import {React, useState, useEffect, Image} from "react";
import {toCelcius, toFahrenheit} from '../Library/TempConverter';




function EightDayForecast () {

const apiKey = `e19fc65c1da6ed28036f370e2cf8c5ce`;
const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=-26.2023&lon=28.0436&appid=${apiKey}`;

const [forecast, setForecast] = useState();
const [showForecast, setShowForecast] = useState(false);

const [showIcon, setShowIcon] = useState(false);
const [iconArray, setIconArray] = useState([]);
const [iconUrlArray, setIconUrlArray] = useState([]);;

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
    // setShowIcon(true)
    console.log(iconArray)
    
    
    
   
    
    
   
}, [forecast])

return ( 
        <div>
            <div className="forecast-container">                
                {showForecast && forecast.daily.map((daily, index) => {
                return (
                    <div key= {index} className="forecast-day">                
                        <div >{daily.weather[0].description}</div>
                        <div >Max: {toCelcius(daily.temp.max)} &#xb0; C</div>
                        <img  src={"http://openweathermap.org/img/wn/" + daily.weather[0].icon + "@2x.png"}></img>
                                          
                    </div>
                    );
                })}      

               
            </div>
            

            
                    
                    
                

            
        </div>
     );
}

export default EightDayForecast ;