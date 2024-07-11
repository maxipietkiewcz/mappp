// src/components/MapWithCircles.jsx
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  GeoJSON,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { formosaCityGeoJSON } from "../data/formosaCityGeoJSON";
import StationInfo from "./StationInfo";
import NavBar from "./NavBar";

const { BaseLayer, Overlay } = LayersControl;

const stations = [
  {
    id: 1,
    coords: [-26.080790166474483, -58.27517468094456],
    name: "Estación del polo científico",
    color: "blue",
    info: "Información sobre la estación del polo científico.",
    temperature: 25,
    humidity: 60,
    pressure: 1012,
    windSpeed: 15,
    precipitation: 2,
  },
  {
    id: 2,
    coords: [-24.256713301626576, -61.242720998079974],
    name: "Estación de Laguna Yema",
    color: "blue",
    info: "Información sobre la estación de Laguna Yema.",
    temperature: 27,
    humidity: 55,
    pressure: 1010,
    windSpeed: 10,
    precipitation: 0,
  },
  {
    id: 3,
    coords: [-26.30541190201433, -59.37291308497001],
    name: "Estación El Colorado",
    color: "blue",
    info: "Información sobre la estación El Colorado.",
    temperature: 30,
    humidity: 50,
    pressure: 1008,
    windSpeed: 20,
    precipitation: 5,
  },
  {
    id: 4,
    coords: [-24.978572655351993, -58.82116985064244],
    name: "Estación de Misión Tacaaglé",
    color: "blue",
    info: "Información sobre la estación de Misión Tacaaglé.",
    temperature: 28,
    humidity: 65,
    pressure: 1015,
    windSpeed: 5,
    precipitation: 1,
  },
];

function MapWithCircles() {
  const [circles, setCircles] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [averages, setAverages] = useState({
    temperature: 0,
    humidity: 0,
    pressure: 0,
    windSpeed: 0,
    precipitation: 0,
  });

  const formosaCenter = [-24.786927, -60.182694];
  const zoomLevel = 7;

  useEffect(() => {
    const calculateAverages = () => {
      const totalStations = stations.length;
      const totalValues = stations.reduce(
        (totals, station) => {
          totals.temperature += station.temperature;
          totals.humidity += station.humidity;
          totals.pressure += station.pressure;
          totals.windSpeed += station.windSpeed;
          totals.precipitation += station.precipitation;
          return totals;
        },
        {
          temperature: 0,
          humidity: 0,
          pressure: 0,
          windSpeed: 0,
          precipitation: 0,
        }
      );

      setAverages({
        temperature: (totalValues.temperature / totalStations).toFixed(2),
        humidity: (totalValues.humidity / totalStations).toFixed(2),
        pressure: (totalValues.pressure / totalStations).toFixed(2),
        windSpeed: (totalValues.windSpeed / totalStations).toFixed(2),
        precipitation: (totalValues.precipitation / totalStations).toFixed(2),
      });
    };

    calculateAverages();
  }, []);

  const handleMarkerClick = (station) => {
    const circleExists = circles.find(
      (circle) =>
        circle.coords[0] === station.coords[0] &&
        circle.coords[1] === station.coords[1]
    );
    if (circleExists) {
      setCircles((prevCircles) =>
        prevCircles.filter(
          (circle) =>
            circle.coords[0] !== station.coords[0] ||
            circle.coords[1] !== station.coords[1]
        )
      );
      setSelectedStation(null);
    } else {
      setCircles((prevCircles) => [
        ...prevCircles,
        { coords: station.coords, color: station.color },
      ]);
      setSelectedStation(station);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9 mt-3">
            <MapContainer
              center={formosaCenter}
              zoom={zoomLevel}
              style={{ height: "calc(87vh)", width: "100%" }}
              zoomControl={true}
            >
              <LayersControl position="topright">
                <BaseLayer checked name="Mapa de Calle">
                  <TileLayer
                    zIndex={1}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </BaseLayer>
                <Overlay name="Mapa de Temperatura" checked>
                  <TileLayer
                    zIndex={2}
                    attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
                    url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=e3dadbc788d4e55d0bc120577741bc69"
                  />
                </Overlay>
                <Overlay name="Precipitación Global" checked>
                  <TileLayer
                    zIndex={2}
                    attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
                    url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=e3dadbc788d4e55d0bc120577741bc69"
                  />
                </Overlay>
                <Overlay name="Presión">
                  <TileLayer
                    zIndex={2}
                    attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
                    url="https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=e3dadbc788d4e55d0bc120577741bc69"
                  />
                </Overlay>
                <Overlay name="Velocidad del Viento">
                  <TileLayer
                    zIndex={2}
                    attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
                    url="https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=e3dadbc788d4e55d0bc120577741bc69"
                  />
                </Overlay>
                <Overlay name="Nubes">
                  <TileLayer
                    zIndex={2}
                    attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
                    url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=e3dadbc788d4e55d0bc120577741bc69"
                  />
                </Overlay>
              </LayersControl>

              {stations.map((station) => (
                <Marker
                  key={station.id}
                  position={station.coords}
                  eventHandlers={{
                    click: () => handleMarkerClick(station),
                  }}
                >
                  <Popup>
                    <div>
                      <h3>{station.name}</h3>
                      <p>Temperatura: {station.temperature}°C</p>
                      <p>Humedad: {station.humidity}%</p>
                      <p>Presión: {station.pressure} hPa</p>
                      <p>Velocidad del Viento: {station.windSpeed} m/s</p>
                      <p>Precipitación: {station.precipitation} mm</p>
                    </div>
                    <button className="btn btn-success">Ver más</button>
                  </Popup>
                </Marker>
              ))}

              {circles.map((circle, index) => (
                <Circle
                  key={index}
                  center={circle.coords}
                  pathOptions={{ color: circle.color, fillColor: circle.color }}
                  radius={10000}
                />
              ))}

              <GeoJSON
                data={formosaCityGeoJSON}
                style={{ color: "#ff7800", weight: 2, opacity: 0.6 }}
              />
            </MapContainer>
          </div>

          <div className="col-md-3 mt-3">
            <div className="sidebar">
              <h4 className="mb-4">Promedios Generales</h4>
              <div className="average-data">
                <p>Temperatura: {averages.temperature}°C</p>
                <p>Humedad: {averages.humidity}%</p>
                <p>Presión: {averages.pressure} mbar</p>
                <p>Viento: {averages.windSpeed} km/h</p>
                <p>Precipitación: {averages.precipitation} mm</p>
              </div>
              {selectedStation && (
                <div className="station-info">
                  <StationInfo station={selectedStation} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapWithCircles;
