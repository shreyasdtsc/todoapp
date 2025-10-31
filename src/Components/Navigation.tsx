// src/components/Navigation.tsx
import React from "react";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav style={{ display: "flex", gap: "12px" }}>
      <NavLink to="/useState" end>
        <span>useState</span>
      </NavLink>
      <NavLink to="/useEffect">
        <span>useEffect</span>
      </NavLink>
      <NavLink to="/useMemo">
        <span>useMemo</span>
      </NavLink>
      <NavLink to="/useContext">
        <span>useContext</span>
      </NavLink>
      <NavLink to="/zustand">
        <span>zustand</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
