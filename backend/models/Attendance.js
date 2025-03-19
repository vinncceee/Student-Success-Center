const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  session: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },
  checkInTime: { type: Date, required: false },
  checkOutTime: { type: Date, required: false },
  duration: { type: Number, required: false }, // Duration in minutes
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false } // Admin verification
});

module.exports = mongoose.model("Attendance", attendanceSchema);
