import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Components/Navigation";
import { AppRoutes } from "./Components/Routes";

export default function App() {
  return (
    <Router>
      <Navigation />
      <AppRoutes />
    </Router>
  );
}
