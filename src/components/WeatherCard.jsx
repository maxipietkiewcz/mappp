import React from "react";
import {
  FaTemperatureLow,
  FaTint,
  FaWind,
  FaTachometerAlt,
} from "react-icons/fa";
import "../styles/WeatherCard.css";
import partlyCloudyBackground from "../assets/image4.avif"; // Importa la imagen de fondo

const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <div
        className="weather-background"
        style={{ backgroundImage: `url(${partlyCloudyBackground})` }}
      >
        <h2 className="weather-card-title"> &#128205;{data.location}</h2>
        <div className="weather-card-content">
          <div className="temperature-column">
            <div className="temperature">
              <FaTemperatureLow className="weather-icon" />
              <h1 className="weather-info-label">{data.temperature}</h1>
            </div>
          </div>
          <div className="details-column">
            <div className="weather-info">
              <div className="weather-info-item">
                <FaTint className="weather-icon" />

                <span className="weather-info-value">{data.humidity}</span>
              </div>
              <div className="weather-info-item">
                <FaTachometerAlt className="weather-icon" />

                <span className="weather-info-value">{data.pressure} </span>
              </div>
              <div className="weather-info-item">
                <FaWind className="weather-icon" />

                <span className="weather-info-value">{data.windSpeed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
