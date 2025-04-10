// NOT USED RIGHT NOW



// const mongoose = require("mongoose");

// const sessionSchema = new mongoose.Schema({
//   student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   date: { type: Date, required: true },
//   startTime: { type: String, required: true },
//   endTime: { type: String, required: true },
//   subject: { type: String, required: true },
//   status: { 
//     type: String, 
//     enum: ["Scheduled", "Completed", "Canceled"], 
//     default: "Scheduled" 
//   },
//   isRecurring: { type: Boolean, default: false },
//   recurrencePattern: { 
//     type: String, 
//     enum: ["Daily", "Weekly", "Biweekly", "Monthly"], 
//     required: function() { return this.isRecurring; }
//   }, // Ensures valid recurrence pattern
//   sessionNotes: {
//     tutorNotes: { type: String, required: false }, 
//     studentNotes: { type: String, required: false }
//   },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Session", sessionSchema);
