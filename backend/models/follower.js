const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowerSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  followId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Follower", FollowerSchema);
