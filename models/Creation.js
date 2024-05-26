const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Creation schema
const creationSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  content: { type: String, required: true }, // HTML content
  // visibility: { type: String, enum: ['public', 'private'], required: true },
  guide: { type: Schema.Types.ObjectId, ref: 'Guide' }, // Reference to the Template
  // sourceCreation: { type: Schema.Types.ObjectId, ref: 'Creation' } // Reference to the parent Creation
});

// Create the Creation model
const Creation = mongoose.model('Creation', creationSchema);

module.exports = Creation;
