import React from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "../styles/MiniMap.css";

const MiniMap = () => {
  const navigate = useNavigate();

  const handleOpenMap = () => {
    navigate("/map"); // Redirigir a la ruta del mapa grande
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[-26.1849, -58.1731]}
        zoom={10}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Circle center={[-26.1849, -58.1731]} radius={5000} />
      </MapContainer>
      <button onClick={handleOpenMap} className="map-button">
        Ver mapa grande
      </button>
    </div>
  );
};

export default MiniMap;
