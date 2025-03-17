const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: false },
  password: { type: String, required: true },
  role: { type: String, enum: ["Student", "Tutor", "Admin"], required: true },
  idCardNumber: { type: String, unique: true, required: false },
  isVerified: { type: Boolean, default: false }, // Admin approval
  profile: {
    qualifications: { type: String, required: false }, // Tutor expertise
    bio: { type: String, required: false },
    learningGoals: { type: String, required: false }, // For students
    gradeLevel: { type: String, required: false }, // Student grade level
    subjectExpertise: [{ type: String, required: false }] // Tutor expertise
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
