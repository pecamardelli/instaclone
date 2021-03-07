const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = Schema({
  publicationId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Like", LikeSchema);
