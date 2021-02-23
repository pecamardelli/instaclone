const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowerSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  followId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Follower", FollowerSchema);
