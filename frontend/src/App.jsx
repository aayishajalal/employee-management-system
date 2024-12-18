import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddEmployee from "./pages/AddEmployee";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddEmployee />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
