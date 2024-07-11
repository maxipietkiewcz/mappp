import React from "react";
import {
  FaTemperatureLow,
  FaTint,
  FaWind,
  FaTachometerAlt,
} from "react-icons/fa";
import "../styles/WeatherCard.css";

const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <h2 className="weather-card-title">Formosa, Argentina</h2>
      <div className="weather-card-content">
        <div className="weather-info">
          <div className="weather-info-item">
            <FaTemperatureLow className="weather-icon" />
            <span className="weather-info-label">Temperatura:</span>
            <span className="weather-info-value">{data.temperature}°C</span>
          </div>
          <div className="weather-info-item">
            <FaTint className="weather-icon" />
            <span className="weather-info-label">Humedad:</span>
            <span className="weather-info-value">{data.humidity}%</span>
          </div>
          <div className="weather-info-item">
            <FaTachometerAlt className="weather-icon" />
            <span className="weather-info-label">Presión:</span>
            <span className="weather-info-value">{data.pressure} mbar</span>
          </div>
          <div className="weather-info-item">
            <FaWind className="weather-icon" />
            <span className="weather-info-label">Viento:</span>
            <span className="weather-info-value">{data.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
