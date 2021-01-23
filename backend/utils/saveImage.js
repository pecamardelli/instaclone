const fs = require("fs");

async function saveImage(data, filename) {
  if (!data || !filename) return console.log("Invalid file name.");
  console.log(data);
  const writeStream = fs.createWriteStream(filename);
  data.pipe(writeStream);

  data.on("end", function () {
    console.log("File saved...");
  });

  data.on("error", function () {
    console.log("Failed to save avatar...");
  });
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
