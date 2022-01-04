function toCelcius(kelvin) {
   return Math.round(kelvin - 273.15);
}

function toFahrenheit(kelvin) {
    return Math.round((kelvin - 273.15) * 9 / 5 + 32);
}

export {toFahrenheit, toCelcius};

