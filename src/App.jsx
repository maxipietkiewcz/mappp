import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { NavBar } from "./components/NavBar";

function MapWithCircles() {
  const [circles, setCircles] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  const formosaCenter = [-24.786927, -60.182694]; // Coordenadas aproximadas del centro de la provincia de Formosa
  const zoomLevel = 7;

  const formosaCityGeoJSON = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-60.88834765625, -23.8916748046875],
              [-59.88834765625, -24.111916748046875],
              [-57.65283203125, -25.293916748046875],
              [-58.41283203125, -26.9983349609375],
              [-62.30634765625, -24.1183349609375],
              [-62.31634765625, -22.49916748046875],
            ],
          ],
        },
      },
    ],
  };

  const stations = [
    {
      id: 1,
      coords: [-26.080790166474483, -58.27517468094456],
      name: "Estación del polo científico",
      color: "blue",
      info: "Información sobre la estación del polo científico.",
    },
    {
      id: 2,
      coords: [-24.256713301626576, -61.242720998079974],
      name: "Estación de Laguna Yema",
      color: "blue",
      info: "Información sobre la estación de Laguna Yema.",
    },
    {
      id: 3,
      coords: [-26.30541190201433, -59.37291308497001],
      name: "Estación El Colorado",
      color: "blue",
      info: "Información sobre la estación El Colorado.",
    },
    {
      id: 4,
      coords: [-24.978572655351993, -58.82116985064244],
      name: "Estación de Misión Tacaaglé",
      color: "blue",
      info: "Información sobre la estación de Misión Tacaaglé.",
    },
  ];

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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9 mt-3">
          <MapContainer
            center={formosaCenter}
            zoom={zoomLevel}
            style={{ height: "calc(87vh)", width: "100%" }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {stations.map((station) => (
              <Marker
                key={station.id}
                position={station.coords}
                eventHandlers={{
                  click: () => handleMarkerClick(station),
                }}
              >
                <Popup>{station.name}</Popup>
              </Marker>
            ))}

            {circles.map((circle, index) => (
              <Circle
                key={index}
                center={circle.coords}
                pathOptions={{
                  color: circle.color,
                  fillColor: circle.color,
                  fillOpacity: 0.2,
                }}
                radius={150000} // Radio en metros (150 km)
              />
            ))}

            <GeoJSON
              data={formosaCityGeoJSON}
              style={{
                color: "green",
                weight: 5, // Línea gruesa
              }}
            />
          </MapContainer>
        </div>
        <div className="col-md-3 ">
          <div className="p-3 ">
            <h1>Información de la Estación</h1>
            {selectedStation ? (
              <>
                <h2>{selectedStation.name}</h2>
                <p>{selectedStation.info}</p>
              </>
            ) : (
              <p>Seleccione una estación en el mapa para ver más detalles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <NavBar />
      <MapWithCircles />
    </div>
  );
}

export default App;
