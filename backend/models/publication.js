const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "User",
  },
  fileUrl: {
    type: String,
    trim: true,
    require: true,
  },
  fileType: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Publication", PublicationSchema);
