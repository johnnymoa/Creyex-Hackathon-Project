const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Template schema
const guideSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  prompt: { type: String, required: true }
}, { timestamps: true });

// Create the Template model
const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;
