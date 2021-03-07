const mongoose = require("mongoose");
const { comments } = require("../config/config");
const Schema = mongoose.Schema;

const CommentSchema = Schema({
  publicationId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    trim: true,
    required: true,
    minLength: comments.minLength || 2,
    maxLength: comments.maxLength || 256,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
