const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${JSON.stringify(req.body)}`);
  next();
});

// MongoDB Connection
mongoose
  .connect("mongodb+srv://admin:admin@testing.id9ly.mongodb.net/studentsuccess?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gradeLevel: { type: String, required: true },
  role: { type: String, required: true, enum: ['Student', 'Tutor'] },
  email: { type: String, default: null }, // Optional, with no uniqueness constraint
});



const User = mongoose.model("User", userSchema);

// Routes
app.post("/api/save-info", async (req, res) => {
  const { name, gradeLevel, role } = req.body;

  // Normalize role to capitalize the first letter
  const allowedRoles = ["Student", "Tutor"];
  const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

  // Check if the role is valid
  if (!allowedRoles.includes(formattedRole)) {
    return res.status(400).json({ message: "Invalid role specified" });
  }

  try {
    // Save data to MongoDB
    const user = new User({ name, gradeLevel, role: formattedRole });
    await user.save();
    res.status(201).json({ message: "User added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving data", error: err.message });
  }
});



app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});
// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

