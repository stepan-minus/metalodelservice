const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  date: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  },
  projectType: {
    type: String,
    enum: ['лестница', 'ворота', 'ограждение', 'мебель', 'другое'],
    required: true
  }
});

module.exports = mongoose.model('Review', reviewSchema); 