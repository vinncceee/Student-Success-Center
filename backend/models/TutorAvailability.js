const mongoose = require("mongoose");

const TutorAvailabilitySchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subjects: [{ type: String, required: true }], // Subjects tutor can teach
  availability: [
    {
      day: { type: String, required: true }, // e.g., "Monday"
      timeSlots: [{ type: String, required: true }] // e.g., ["10:00 AM - 12:00 PM", "3:00 PM - 5:00 PM"]
    }
  ],
  isApproved: { type: Boolean, default: false }, // Admin approval required
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TutorAvailability", TutorAvailabilitySchema);
