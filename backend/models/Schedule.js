const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  finalizedSlots: [
    {
      date: { type: Date, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      subject: { type: String, required: true }
    }
  ],
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Admin
  approvedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Schedule", scheduleSchema);
