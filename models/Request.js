const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  petName: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  pickupDate: { type: String, required: true },
  message: { type: String },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);