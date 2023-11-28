import React, {useState, useEffect } from "react";
import "./style.css";
import WeatherDisplay from "./WeatherDisplay";
const weatherKey=process.env.REACT_APP_API_KEY;
const baseUrl="https://api.openweathermap.org/data/2.5/weather"
const Temp = () => {
  const [searchData, setSearchData] = useState("Dehradun");
  const [weatherData,setWeatherData]=useState({});
  const getWeather = async () => {
    try {
      let url = `${baseUrl}?q=${searchData}&units=metric&appid=${weatherKey}`;
      let res=await fetch(url);
      let data=await res.json();
      const {temp,humidity,pressure}=data.main;
      const {speed}=data.wind;
      const {main:weatherMood}=data.weather[0];
      const {name}=data;
      const {country,sunset}=data.sys;
      const weatherInfo={
        temp,
        humidity,
        pressure,
        speed,
        weatherMood,
        name,
        country,
        sunset
      };
      setWeatherData(weatherInfo);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <>
      <div className="wrapper">
        <div className="search">
          <input
            type="search"
            className="SearchTerm"
            placeholder="Enter city..."
            autoFocus
            id="search"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <button className="searchButton" type="button" onClick={getWeather}>
            Search
          </button>
        </div>
      </div>
     <WeatherDisplay weatherData={weatherData}/>
    </>
  );
};

export default Temp;
