import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const ScreenRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<span>View Current Hand</span>} />
      </Routes>
    </Router>
  );
};
