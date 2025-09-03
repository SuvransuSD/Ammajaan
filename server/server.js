import express from "express";
import mysql from "mysql2";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "images")));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "amazon_clone"
});

db.connect(err => {
  if (err) return console.error("DB connection failed:", err);
  console.log("✅ Connected to MySQL Database: amazon_clone");
});

// Routes
app.get("/", (req, res) => res.send("Backend server is running 🚀"));

// ✅ FIXED: Added /api prefix to match frontend expectations
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/api/products", (req, res) => {
  const { title, price, category, description, image } = req.body;
  const sql = "INSERT INTO products (title, price, category, description, image) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, price, category, description, image], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, title, price, category, description, image });
  });
});

// ✅ ADDED: Additional CRUD operations for completeness
app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ error: "Product not found" });
    res.json(results[0]);
  });
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, category, description, image } = req.body;
  const sql = "UPDATE products SET title = ?, price = ?, category = ?, description = ?, image = ? WHERE id = ?";
  db.query(sql, [title, price, category, description, image, id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
    res.json({ id, title, price, category, description, image });
  });
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
    res.status(204).send();
  });
});

// ✅ Keep original endpoints for backward compatibility
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/products", (req, res) => {
  const { title, price, category, description, image } = req.body;
  const sql = "INSERT INTO products (title, price, category, description, image) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, price, category, description, image], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, title, price, category, description, image });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
