function toCelcius(kelvin) {
   return Math.round(kelvin - 273.15);
}

function toFahrenheit(kelvin) {
    return Math.round((kelvin - 273.15) * 9 / 5 + 32);
}

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export {toFahrenheit, toCelcius, capitalize};

