const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = Schema({
  publicationId: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Publication",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "User",
  },
  text: {
    type: String,
    trim: true,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
