const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// 🔹 Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔹 User Schema with `idNumber` and Unique Email
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Ensure unique emails
  name: { type: String, required: true },
  idNumber: { type: String, required: true, unique: true }, // Ensure unique ID Numbers
  gradeLevel: { type: String, required: true },
  role: { type: String, required: true, enum: ["Student", "Tutor", "Admin"] }, // Include Admin
});

const User = mongoose.model("User", userSchema);

// 🔹 Middleware to Check Role
async function checkRole(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "❌ User not found" });
    }

    if (user.role !== req.role) {
      return res.status(403).json({ message: "❌ Forbidden: Incorrect role" });
    }

    next();
  } catch (error) {
    console.error("Error checking role:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
}

// 🔹 API to Save User Info (New Registration)
app.post("/api/save-info", async (req, res) => {
  try {
    const { email, name, idNumber, gradeLevel, role } = req.body;

    if (!email || !name || !idNumber || !gradeLevel || !role) {
      return res.status(400).json({ message: "⚠️ All fields are required" });
    }

    // 🔹 Check if Email or ID already exists
    const existingUser = await User.findOne({ $or: [{ email }, { idNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: "⚠️ Email or ID Number already exists" });
    }

    // Save new user
    const user = new User({ email, name, idNumber, gradeLevel, role });
    await user.save();
    res.status(201).json({ message: "✅ User added successfully!" });
  } catch (err) {
    console.error("❌ Error saving user:", err);
    res.status(500).json({ message: "❌ Error saving data", error: err.message });
  }
});

// 🔹 API to Check if User Exists
app.get("/api/user/:email", async (req, res) => {
  try {
      const { email } = req.params;
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: "❌ User not found" });
      }

      console.log("✅ Fetched user from DB:", user); // ✅ Debugging

      res.status(200).json({
          email: user.email,
          name: user.name,
          idNumber: user.idNumber.trim(), // ✅ Ensure ID is properly formatted
          role: user.role
      });
  } catch (err) {
      console.error("❌ Error fetching user:", err);
      res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});


// 🔹 API to Verify ID Number Before Sign-Out
app.post("/api/verify-id", async (req, res) => {
  try {
    const { email, idNumber } = req.body;

    const user = await User.findOne({ email, idNumber });
    if (!user) {
      return res.status(400).json({ message: "❌ ID Number does not match our records" });
    }

    res.status(200).json({ message: "✅ ID verified successfully" });
  } catch (err) {
    console.error("❌ Error verifying ID:", err);
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

// 🔹 Start Server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
