import React from "react";
import {toCelcius, toFahrenheit} from '../Library/TempConverter';

const apiKey = `e19fc65c1da6ed28036f370e2cf8c5ce`;
const city = `Johannesburg`;
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${apiKey}`;
const fetchWeather = () => {
    fetch(url)
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        console.log(toFahrenheit(data.main.temp) + ' F');
        console.log(toCelcius(data.main.temp) + ' C');
    })
}



fetchWeather();

function Apicall () {
    return ( 
        <div>Hello world</div>
     );
}

export default Apicall ;