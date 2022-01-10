import {React, useState, useEffect, useContext} from "react";
import {toCelcius, toFahrenheit, capitalize} from '../Library/TempConverter';
import moment from 'moment';
import { AppContext } from '../Context/AppContext';




function EightDayForecast () {

const appContext = useContext(AppContext);

const apiKey = `e19fc65c1da6ed28036f370e2cf8c5ce`;
const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${appContext.lat}&lon=${appContext.long}&appid=${apiKey}`;

const [showForecast, setShowForecast] = useState(false);
const [cSelected, setCSelected] = useState(true);
const [fSelected, setFSelected] = useState(false);




const fetchWeather = () => {
    fetch(oneCallUrl)
    .then((response) => response.json())
    .then(data => {        
        appContext.setWeekly(data);          
    })
    .catch((error) => {
        console.log(error);
    })
}

useEffect(() => {
    fetchWeather();     
}, [appContext.lat, appContext.long]);

useEffect(() => {
    if (appContext.weekly) {
        setShowForecast(true);
        console.log(appContext.weekly);
        
        
        // console.log(forecast.daily[0].weather[0].icon)
    }
}, [appContext.weekly] )


const cSelector = () =>{    
        setCSelected(true);
        setFSelected(false);    
}

const fSelector = () =>{    
    setFSelected(true);
    setCSelected(false); 

}


return ( 
        <div>
            <div className="forecast-container">                
                {showForecast && appContext.weekly.daily.map((daily, index) => {
                return (
                    <div key= {index} className="forecast-day">                
                        
                        <div>{moment.unix(daily.dt).format('dddd DD/MM')}</div>
                        {/* <div>{moment.unix(daily.dt).format('DD.MM.YYYY')}</div> */}
                        <div >Max: {cSelected ? toCelcius(daily.temp.max) : toFahrenheit(daily.temp.max)} &#xb0; 
                            <span   className={cSelected ? "selected" : "unselected"} onClick={cSelector}> C</span> | 
                            <span   className={fSelected ? "selected" : "unselected"} onClick={fSelector}> F</span>
                        </div>
                        <img alt={index} src={"http://openweathermap.org/img/wn/" + daily.weather[0].icon + "@2x.png"}></img>
                        <div >{capitalize(daily.weather[0].description)}</div>
                                          
                    </div>
                    );
                })}      

               
            </div>
            <div>{appContext.city}</div>
            {/* <div>{appContext.weekly.timezone}</div> */}

            
                    
                    
                

            
        </div>
     );
}

export default EightDayForecast ;