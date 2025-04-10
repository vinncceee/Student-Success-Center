// NOT USED RIGHT NOW


// const mongoose = require("mongoose");

// const notificationSchema = new mongoose.Schema({
//   recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   type: { 
//     type: String, 
//     enum: ["Session Reminder", "Schedule Update", "Important Announcement"], 
//     required: true 
//   },
//   message: { type: String, required: true },
//   deliveryMethod: { 
//     type: String, 
//     enum: ["Email", "SMS", "Both"], 
//     default: "Email" 
//   }, // Supports Email, SMS, or Both
//   sentAt: { type: Date, default: Date.now },
//   read: { type: Boolean, default: false }
// });

// module.exports = mongoose.model("Notification", notificationSchema);
