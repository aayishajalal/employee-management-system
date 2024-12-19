import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS
import { useNavigate } from "react-router-dom"; // For navigation

// Departments array for the dropdown
const departments = ["HR", "Engineering", "Marketing"];

// Zod schema for validation
const employeeSchema = z.object({
  employeeId: z
    .string()
    .min(1, "EmployeeId cannot be empty")
    .max(10, "Max 10 characters"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(/^\d{10}$/, "Must be 10 digits"),
  department: z.string().min(1, "Department is required"),
  dateOfJoining: z
    .string()
    .refine((date) => new Date(date) <= new Date(), "Cannot be a future date"),
  role: z.string().min(1, "Role is required"),
});

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(null); // State to store the selected date

  const {
    register,
    handleSubmit,
    reset,
    setValue, // To set the value of date in react-hook-form
    formState: { errors },
  } = useForm({ resolver: zodResolver(employeeSchema) });

  const onSubmit = async (formData) => {
    try {
      const backendUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:5000"
          : "https://employee-management-system-wktk.onrender.com";

      const response = await axios.post(`${backendUrl}/add-employee`, formData);
      // API call
      console.log("Response:", response);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Sync selected date with React Hook Form
  const handleDateChange = (date) => {
    setDate(date);
    setValue("dateOfJoining", date.toISOString().split("T")[0]); // Update form value
  };

  return (
    <div className="max-w-xl p-6 mx-auto bg-white rounded-md shadow-md">
      <button
        onClick={() => navigate("/")} // Go back to homepage
        className="flex items-center mb-6 text-blue-600"
      >
        ← Back to Home
      </button>

      <h1 className="mb-6 text-3xl font-bold text-blue-600">Add Employee</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register("employeeId")}
            placeholder="Employee ID"
            className={`border p-3 w-full rounded ${
              errors.employeeId ? "border-red-500" : ""
            }`}
          />
          {errors.employeeId && (
            <p className="text-sm text-red-500">{errors.employeeId.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("name")}
            placeholder="Name"
            className={`border p-3 w-full rounded ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("email")}
            placeholder="Email"
            className={`border p-3 w-full rounded ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("phone")}
            placeholder="Phone"
            className={`border p-3 w-full rounded ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="mb-4">
          <select
            {...register("department")}
            className={`border p-3 w-full rounded ${
              errors.department ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-sm text-red-500">{errors.department.message}</p>
          )}
        </div>

        {/* DatePicker component for Date of Joining */}
        <div className="mb-4">
          <DatePicker
            selected={date}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()} // Disable future dates
            placeholderText="Select Date"
            className={`border p-3 w-full rounded ${
              errors.dateOfJoining ? "border-red-500" : ""
            }`}
          />
          {errors.dateOfJoining && (
            <p className="text-sm text-red-500">
              {errors.dateOfJoining.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("role")}
            placeholder="Role"
            className={`border p-3 w-full rounded ${
              errors.role ? "border-red-500" : ""
            }`}
          />
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        <div className="flex gap-4 mb-4">
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-500 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              setDate(null); // Reset date picker
            }}
            className="w-full p-3 text-white bg-gray-500 rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
