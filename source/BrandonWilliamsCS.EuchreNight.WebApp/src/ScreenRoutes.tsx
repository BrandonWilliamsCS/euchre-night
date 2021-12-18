import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CurrentHandScreen } from "./Screens/CurrentHandScreen/CurrentHandScreen";

export const ScreenRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<CurrentHandScreen />} />
      </Routes>
    </Router>
  );
};
