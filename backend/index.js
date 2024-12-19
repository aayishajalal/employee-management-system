import express from "express";
import mysql2 from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import { z } from "zod"; // Import Zod

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

const db = mysql2.createConnection({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "userpassword",
  database: process.env.DB_NAME || "employeedb",
});

// Define Zod schema for employee data validation
const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  employeeId: z
    .string()
    .min(1, "EmployeeId cannot be empty")
    .max(10, "Max 10 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(/^\d{10}$/, "Must be 10 digits"),
  department: z.string().min(1, "Department is required"),
  dateOfJoining: z
    .string()
    .refine((date) => new Date(date) <= new Date(), "Cannot be a future date"),
  role: z.string().min(1, "Role is required"),
});

db.query(
  `
  CREATE TABLE IF NOT EXISTS employee_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255), 
    employeeId VARCHAR(255) UNIQUE, 
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20), 
    department VARCHAR(100), 
    dateOfJoining DATE, 
    role VARCHAR(100)
  );
`,
  (err) => {
    if (err) console.error("Error creating table:", err);
    else console.log("Table created or exists.");
  }
);

// POST endpoint to add an employee with Zod validation
app.post("/add-employee", async (req, res) => {
  try {
    // Validate the request body with Zod
    const parsedData = employeeSchema.parse(req.body); // This will throw if validation fails

    const { name, employeeId, email, phone, department, dateOfJoining, role } =
      parsedData;

    // Check if employee already exists
    db.execute(
      "SELECT * FROM employee_table WHERE employeeId = ? OR email = ?",
      [employeeId, email],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Internal error" });

        if (result.length) {
          return res.status(400).json({ message: "Employee already exists" });
        }

        // Insert the validated data into the database
        db.execute(
          "INSERT INTO employee_table (name, employeeId, email, phone, department, dateOfJoining, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name, employeeId, email, phone, department, dateOfJoining, role],
          (err) => {
            if (err) {
              return res.status(500).json({ message: "Error adding employee" });
            }
            res.status(201).json({ message: "Employee added successfully" });
          }
        );
      }
    );
  } catch (error) {
    // If Zod validation fails, send a 400 error with the validation messages
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors, // Return the Zod validation errors
      });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
