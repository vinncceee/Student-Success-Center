const mongoose = require("mongoose");

const tutorAvailabilitySchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },  // Contact info
  phoneNumber: { type: String, required: false }, 
  availableTimes: [
    {
      day: { type: String, required: true }, // Example: "Monday"
      slots: [
        {
          startTime: { type: String, required: true },
          endTime: { type: String, required: true }
        }
      ],
      subject: { type: String, required: true }
    }
  ],
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TutorAvailability", tutorAvailabilitySchema);
