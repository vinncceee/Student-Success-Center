const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },  // Store the user's email
  name: { type: String, required: true },
  gradeLevel: { type: String, required: true },
  role: { type: String, required: true, enum: ["Student", "Tutor"] },
});

const User = mongoose.model("User", userSchema);

// Save User Data
app.post("/api/save-info", async (req, res) => {
  try {
    const { email, name, gradeLevel, role } = req.body;

    if (!email || !name || !gradeLevel || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = new User({ email, name, gradeLevel, role });
    await user.save();
    res.status(201).json({ message: "User added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving data", error: err.message });
  }
});

// Get Users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
