const { Schema, model } = require('mongoose');

const { Types: { ObjectId } } = Schema;

const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Comment', commentSchema);
