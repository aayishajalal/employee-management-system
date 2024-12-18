import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const EmployeeForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      employeeId: "",
      email: "",
      phone: "",
      department: "",
      dateOfJoining: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      employeeId: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Employee ID is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Must be a valid 10-digit number")
        .required("Phone number is required"),
      department: Yup.string().required("Department is required"),
      dateOfJoining: Yup.date()
        .max(new Date(), "Cannot select a future date")
        .required("Date of joining is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: onSubmit,
  });

  return (
    <div className="form">
      <h1>Add Employee</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            id="employeeId"
            {...formik.getFieldProps("employeeId")}
          />
          {formik.touched.employeeId && formik.errors.employeeId && (
            <div className="error">{formik.errors.employeeId}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone"
            id="phone"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="error">{formik.errors.phone}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <select
            name="department"
            id="department"
            {...formik.getFieldProps("department")}
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
          {formik.touched.department && formik.errors.department && (
            <div className="error">{formik.errors.department}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dateOfJoining">Date of Joining:</label>
          <input
            type="date"
            name="dateOfJoining"
            id="dateOfJoining"
            {...formik.getFieldProps("dateOfJoining")}
          />
          {formik.touched.dateOfJoining && formik.errors.dateOfJoining && (
            <div className="error">{formik.errors.dateOfJoining}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            name="role"
            id="role"
            {...formik.getFieldProps("role")}
          />
          {formik.touched.role && formik.errors.role && (
            <div className="error">{formik.errors.role}</div>
          )}
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
          <button
            type="reset"
            onClick={formik.handleReset}
            className="reset-button"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;