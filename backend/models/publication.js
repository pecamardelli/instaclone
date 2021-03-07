const mongoose = require("mongoose");
const { publications } = require("../config/config");

const PublicationSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  fileName: {
    type: String,
    trim: true,
    required: true,
    minLength: publications.minFileNameLength,
    maxLength: publications.maxFileNameLength,
  },
  fileExtension: {
    type: String,
    trim: true,
    minLength: publications.minFileExtensionLength,
    maxFileNameLength: publications.maxFileExtensionLength,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Publication", PublicationSchema);
