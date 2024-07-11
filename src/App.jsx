// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MapWithCircles from "./components/MapWithCircles";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapWithCircles />} />
      </Routes>
    </Router>
  );
}

export default App;
