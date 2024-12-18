import React from "react";
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddEmployee.css";

const AddEmployee = () => {
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("https://employee-management-system-wktk.onrender.com/add-employee", values);
      toast.success(response.data, { position: "top-right", autoClose: 3000 });
    } catch (error) {
      toast.error(error.response?.data || "An error occurred", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div className="add-employee-container">
      <div className="form">
        <EmployeeForm onSubmit={handleSubmit} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEmployee;
