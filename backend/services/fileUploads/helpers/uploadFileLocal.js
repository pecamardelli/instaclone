const fs = require("fs");

async function uploadFileLocal(data, filename) {
  if (!data || !filename) return console.error("Invalid file name.");

  try {
    data.pipe(fs.createWriteStream(filename));
  } catch (error) {
    console.error(error);
  }

  /*
  fs.open(filename, "w", (err, fd) => {
    if (err) throw err;

    fs.writeFile(fd, data, (err) => {
      if (err) throw err;
    });
  });
  */
}

module.exports = uploadFileLocal;
