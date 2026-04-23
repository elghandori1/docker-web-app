const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_NAME || "testdb"
});

db.connect(err => {
  if (err) console.log("DB error:", err);
  else console.log("DB connected ✅");
});

// Create table
db.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255)
  )
`);

// GET tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// POST task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  db.query(
    "INSERT INTO tasks (title) VALUES (?)",
    [title],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, title });
    }
  );
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM tasks WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Task not found" });
    res.status(204).send();
  });
});

app.listen(3000, () => console.log("Server running 🚀"));