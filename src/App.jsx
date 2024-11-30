import React, { useState, useEffect } from 'react';
import './App.css';
import { FaSearchLocation } from "react-icons/fa";
import clear_icon from './assets/clear.png'
import cloud_icon from './assets/cloud.png'
import drizzle_icon from'./assets/drizzle.png'
import rain_icon from './assets/rain.png'
import snow_icon from './assets/snow.png'
import wind_icon from './assets/thewind.png'
import humidity_icon from './assets/thehumidity.png'

const API_KEY = '274e9e07aefa6514490857cf5ebf61e1';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    }

  const handleSearch = async () => {
    if (!city) return; 

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData(
        {
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location:data.name,
          icon:icon,
        }
      );
      setError(null);
      // console.log(weatherData);
      
    } catch (err) {
      // console.error(err);
      setError('City not found'); // Handle API errors
    } finally {
      setCity(''); // Clear search input after fetching
    }
  };

  // useEffect(() => {
  //   // Optional: Fetch weather data on initial render (if desired)
  //   // handleSearch();
  // }, []);

  return (
    <div className="container">
      <div className="header">
        <div className="search-box">
          <input
            type="text"
            placeholder="location"
            className="input-box"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="" id="searchBtn" onClick={handleSearch}>
            <FaSearchLocation className='thesearch'/>
          </button>
        </div>
      </div>
      {weatherData && !error ? ( 
        <div className="weather-body">
          <h1>{weatherData.location}</h1>
          <img src={weatherData.icon} alt="weather" className="weather-img" />
          <div className="weather-box">
            <p className="temperature">
              {weatherData.temperature}
              <sup>°C</sup>
            </p>
            {/* <p className="description">{weatherData[0].description}</p> */}
          </div>
          <div className="weather-details">
            <div className="humidity">
              <img src={humidity_icon} alt="" />
              <div className="text">
                <span id="humidity">{weatherData.humidity}%</span>
                <p>humidity</p>
              </div>
            </div>
            <div className="wind">
              <img src={wind_icon} alt="" />
              <div className="text">
                <span id="wind-speed">{weatherData.windSpeed}km/h</span>
                <p>wind speed</p>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <p className="error">{error}</p> 
      ) : null}
    </div>
  );
}

export default App;