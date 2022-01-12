import {React, useState, useEffect, useContext} from "react";
import {toCelcius, toFahrenheit, capitalize} from '../Library/TempConverter';
import moment from 'moment';
import { AppContext } from '../Context/AppContext';
import Spinner from 'react-bootstrap/Spinner';



function EightDayForecast () {

const appContext = useContext(AppContext);

const apiKey = `e19fc65c1da6ed28036f370e2cf8c5ce`;
const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${appContext.lat}&lon=${appContext.long}&appid=${apiKey}`;

const [showForecast, setShowForecast] = useState(false);
const [cSelected, setCSelected] = useState(true);
const [fSelected, setFSelected] = useState(false);
const [showDaily, setShowDaily] = useState(false);
const [keys, setKeys] = useState();
const [showSpinner, setShowSpinner] = useState(false);




const fetchWeather = () => {
    setShowDaily(false);
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


const cSelector = (event) =>{    
        setCSelected(true);
        setFSelected(false);
        
}

const fSelector = (event) =>{    
    setFSelected(true);
    setCSelected(false); 
    

}

const toggleDaily = (event, index) =>{
    if (event.target.id !== "fselector" && event.target.id !== "cselector") {
        setShowDaily(false);
        setShowSpinner(true); 
        // console.log(event.target)
        setTimeout(() => {
            setShowSpinner(false);
            setKeys(index);
            setShowDaily(true);
        }, 500)
    }
    console.log(event.target.id)

    
}


return ( 
        <div className="wrapper">
            <div className="forecast-container ">                
                {showForecast && appContext.weekly.daily.map((daily, index) => {
                return (
                    <>
                    <div key= {daily.dt} id="forecast-day" className="forecast-day  " onClick={(event) => toggleDaily(event, index)}>                
                        
                        <div className="day-header">{moment.unix(daily.dt).format('ddd DD/MM')}</div>
                        <div >Max: {cSelected ? toCelcius(daily.temp.max) : toFahrenheit(daily.temp.max)} &#xb0; 
                            <span id="cselector"  className={cSelected ? "selected" : "unselected"} onClick={cSelector}> C</span> | 
                            <span id="fselector"  className={fSelected ? "selected" : "unselected"} onClick={fSelector}> F</span>
                        </div>
                        {/* <img alt={index} src={"http://openweathermap.org/img/wn/" + daily.weather[0].icon + "@2x.png"}></img> */}
                        <div >{capitalize(daily.weather[0].description)}</div>
                                          
                    </div>
                    
                    </>
                    );
                })}      
                
               
            </div>
            {!showDaily && <div>{appContext.city}</div>}
            {showSpinner && <Spinner animation="grow" variant="secondary" />}
            {/* <div>{appContext.weekly.timezone}</div> */}
            {showDaily && <div className="daily-detailed-card">
                            <div className="day-header flex-row">
                                <span>{moment.unix(appContext.weekly.daily[keys].dt).format('dddd DD MMMM, YYYY')}</span>
                                <span>{appContext.city}</span>
                            </div>
                            <div id="body-container" className="flex-row body-container test-border1">
                            <div className="temp-container">
                                <div className="flex-column min-max test-border1">
                                    <div>Max: {cSelected ? toCelcius(appContext.weekly.daily[keys].temp.max) : toFahrenheit(appContext.weekly.daily[keys].temp.max)} </div>
                                    <div>Min: {cSelected ? toCelcius(appContext.weekly.daily[keys].temp.min) : toFahrenheit(appContext.weekly.daily[keys].temp.min)} </div>

                                </div>
                                <div className="test-border1 cf-container">&#xb0;
                                    <span className={cSelected ? "selected" : "unselected"} onClick={cSelector}>C</span> |
                                    <span className={fSelected ? "selected" : "unselected"} onClick={fSelector}>F</span>
                                </div>
                            </div>                           
                                <div id="body-info" className="test-border1 body-info flex-column">
                                    <div>Humidity {appContext.weekly.daily[keys].humidity}</div>
                                    <div>Sunrise {moment.unix(appContext.weekly.daily[keys].sunrise).format('h:mm:ss a')}</div>
                                    <div>Sunset {moment.unix(appContext.weekly.daily[keys].sunset).format('h:mm:ss a')}</div>
                                </div>
                            </div>
                            <div>
                                <img alt="forecast-icon" className="small-img" src={"http://openweathermap.org/img/wn/" + appContext.weekly.daily[keys].weather[0].icon + "@2x.png"}></img>
                            </div>

            </div>}
            
                    
                    
                

            
        </div>
     );
}

export default EightDayForecast ;