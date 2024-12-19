import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import { FaUsers } from 'react-icons/fa'; // Icons for formal look
import { HiPlus } from 'react-icons/hi'; // Icon for 'add' button

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl p-8 text-center bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-blue-600">Employee Management System</h1>
        <p className="mb-4 text-lg text-gray-700">
          Welcome to the Employee Management System. Manage employee data efficiently with our
          intuitive form and streamlined process.
        </p>
        <div className="flex justify-center mb-6">
          <FaUsers className="text-6xl text-blue-600" />
        </div>
        <button
          onClick={() => navigate('/employee-form')} // Navigate to the form page
          className="flex items-center justify-center px-6 py-3 text-lg text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <HiPlus className="mr-2" />
          Add New Employee
        </button>
      </div>
    </div>
  );
};

export default HomePage;
