const mongoose = require('mongoose');

const { Schema } = mongoose;
const favoriteSchema = new Schema({
  placeId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Favorite', favoriteSchema);
