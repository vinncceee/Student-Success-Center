const mongoose = require("mongoose");

const idCardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cardNumber: { type: String, unique: true, required: true },
  issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  issuedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["Active", "Deactivated"], default: "Active" },
});

module.exports = mongoose.model("IDCard", idCardSchema);
