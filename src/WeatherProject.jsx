import React, { useState, useEffect } from "react";
import Card from './Card';
import "./weather.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Jodhpur");
  const [tempInfo, setTempInfo] = useState({});
  const [error, setError]=useState('')

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.weatherapi.com/v1/current.json?key=ff79d6d423d94ddd991104823230509&q=${searchValue}&aqi=no`;

      let res = await fetch(url);
      let data = await res.json();
      console.log(data)
      const {humidity, pressure_mb, wind_kph:speed, uv} = data.current;
      const temp = await data.current.temp_c;
      const { text: weathermood, icon } = data.current.condition;
      const { name ,country} = data.location;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure_mb,
        weathermood,
        name,
        speed,
        country,
        icon,
        uv,
      };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      setError('Please Enter Valid City')
      console.log(error);
    }
  };
  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
    
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => {
            setSearchValue(e.target.value)
            setError('')
            }
            }
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>
      {/* error handling */}
      
      <div className="error">
      {error}
      </div>

      {/* our temp card  */}
      <Card {...tempInfo} />
    </>
  );
};

export default Temp;
