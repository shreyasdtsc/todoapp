import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import TodoUseState from "./ReactUse/TodoUseState";
import TodoUseEffect from "./ReactUse/TodoUseEffect";
import ToDoUseMemo from "./ReactUse/ToDoUseMemo";
import TodoContext from "./ReactUse/Context/TodoContext";
import ToDOZuStand from "./ZuStand/zustand";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/useState" element={<TodoUseState />} />
      <Route path="/useEffect" element={<TodoUseEffect />} />
      <Route path="/useMemo" element={<ToDoUseMemo />} />
      <Route path="/useContext" element={<TodoContext />} />
      <Route path="/zustand" element={<ToDOZuStand />} />
    </Routes>
  );
};
