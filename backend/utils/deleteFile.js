const fs = require("fs");

async function deleteFile(filePath) {
  if (!filePath) throw new Error("Invalid file name.");
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  });
}

module.exports = deleteFile;
