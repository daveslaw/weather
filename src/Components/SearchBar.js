    import {React, useState, useEffect, useContext} from 'react';
    import { AppContext } from '../Context/AppContext';


function SearchBar() {

    const appContext = useContext(AppContext);
    const apiKey = `e19fc65c1da6ed28036f370e2cf8c5ce`;

    const [searchInput, setSearchInput] = useState("");  

    const searchFunction = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}`)
        .then((response) => response.json())
        .then(data => {        
            if (data) {
                appContext.setLat(data.coord.lat);
                appContext.setLong(data.coord.lon);
                
                appContext.setCity(data.name);
                console.log(data)
                // console.log("Latitude: " + lat);
                // console.log(data);
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Error: " + error)
        })       
    }

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
      };
    
    return (
        <div>
            <input
                placeholder="Search city here"
                value={searchInput}
                onInput={handleSearchInput}
            >
            </input>
            <button 
                onClick={searchFunction}
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;