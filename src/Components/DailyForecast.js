import {React, useState, useEffect} from "react";
import {toCelcius, toFahrenheit} from '../Library/TempConverter';



function DailyForecast () {

const apiKey = `e19fc65c1da6ed28036f370e2cf8c5ce`;
const city = `Johannesburg`;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const [forecast, setForecast] = useState();
const [showForecast, setShowForecast] = useState(false);



    function fetchWeather() {
        fetch(url)
            .then((response) => response.json())
            .then(data => {
                setForecast(data);
            })
            .catch((error) => {
                console.log(error);
            });
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
        <div >
            {showForecast && <div>Hello world</div>}
            
            
            
            
            
           
            
            
            
            
            
            
            
        </div>
     );
}

export default DailyForecast ;