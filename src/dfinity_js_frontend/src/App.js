import React from "react";
import "./App.css";
import HomeLandingpagePage from "./pages/HomeLandingpage";
import "./styles/tailwind.css";
import "./styles/index.css";
import "./styles/font.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Driver from "./pages/Driver";
import Clients from "./pages/Client";
import Supplier from "./pages/Supplier";
import Farmer from "./pages/Farmer";

const App = function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLandingpagePage />} />
        <Route path="/drivers" element={<Driver />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/suppliers" element={<Supplier />} />
        <Route path="/farmers" element={<Farmer />} />
      </Routes>
    </Router>
  );
};

export default App;
