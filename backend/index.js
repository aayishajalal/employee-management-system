import express from "express";
import mysql2 from "mysql2";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*'
}));

const db = mysql2.createConnection({
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'userpassword',
  database: process.env.DB_NAME || 'employeedb'
});

db.query(`
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
`, (err) => {
  if (err) console.error("Error creating table:", err);
  else console.log("Table created or exists.");
});

app.post("/add-employee", (req, res) => {
  const { name, employeeId, email, phone, department, dateOfJoining, role } = req.body;

  if (!name || !employeeId || !email || !phone || !department || !dateOfJoining || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.execute("SELECT * FROM employee_table WHERE employeeId = ? OR email = ?", [employeeId, email], (err, result) => {
    if (err) return res.status(500).json({ message: "Internal error" });

    if (result.length) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    db.execute("INSERT INTO employee_table (name, employeeId, email, phone, department, dateOfJoining, role) VALUES (?, ?, ?, ?, ?, ?, ?)", 
      [name, employeeId, email, phone, department, dateOfJoining, role], 
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Error adding employee" });
        }
        res.status(201).json({ message: "Employee added successfully" });
      }
    );
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
