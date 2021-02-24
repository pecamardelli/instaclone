const fs = require("fs");

async function saveImage(data, filename) {
  if (!data || !filename) return console.error("Invalid file name.");

  data.pipe(fs.createWriteStream(filename));

  /*
  fs.open(filename, "w", (err, fd) => {
    if (err) throw err;

    fs.writeFile(fd, data, (err) => {
      if (err) throw err;
    });
  });
  */
}

module.exports = saveImage;
