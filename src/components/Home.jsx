// src/components/Home.jsx
import React from "react";
import "../styles/home.css";
import WeatherCard from "./WeatherCard";
import MiniMap from "./MiniMap";
import NavBar from "./NavBar";

const weatherInfo = {
  location: "Formosa, Argentina",
  temperature: "13°C",
  feelsLike: "Sensación térmica: 11°C",
  windSpeed: "Viento: 15 km/h",
  humidity: "Humedad: 58%",
  visibility: "Visibilidad: 20 km",
  pressure: "Presión: 1024 mbar",
  dewPoint: "Punto de rocío: 5°C",
};

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="col-md-3">
        <MiniMap />
      </div>
    </div>
  );
};

export default Home;
