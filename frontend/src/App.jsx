import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import HomePage from "./pages/Homepage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
