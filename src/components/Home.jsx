import React from "react";
import "../styles/home.css";
import MiniMap from "./MiniMap";
import NavBar from "./NavBar";

const weatherInfo = {
  location: "Formosa, Argentina",
  temperature: "13°C, Parc. soleado",
  feelsLike: "Sensación térmica: 11°C",
  wind: "Viento: 15 km/h",
  humidity: "Humedad: 58%",
  visibility: "Visibilidad: 20 km",
  pressure: "Presión: 1024 mbar",
  dewPoint: "Punto de rocío: 5°C",
};

const Home = () => {
  return (
    <div>
      <NavBar />

      <div className="home-container">
        <div className="info-card">
          <h5>&#128205; {weatherInfo.location}</h5>
          {Object.keys(weatherInfo).map(
            (key) => key !== "location" && <p key={key}>{weatherInfo[key]}</p>
          )}
        </div>
        <div className="map-card">
          <MiniMap />
        </div>
      </div>
    </div>
  );
};

export default Home;
