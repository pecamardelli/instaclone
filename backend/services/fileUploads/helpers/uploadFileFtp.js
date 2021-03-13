const Client = require("ftp");
const { fileUploads } = require("../../../config/config");

const uploadFileFtp = (params) => {
  const { data, filePath, fileName, isPublic = true } = params;
  const client = new Client();
  console.dir(fileUploads.ftp);
  client.on("ready", function () {
    client.mkdir(`${filePath}`, true, function (err) {
      if (err) {
        client.end();
        throw new Error(
          `Error creating directory ${filePath}: ${err.message}.`
        );
      }
    });

    client.put(data, `${filePath}/${fileName}`, function (err) {
      if (err) {
        client.end();
        throw new Error(`Error uploading ${fileName}: ${err.message}.`);
      }
      client.end();
    });
  });

  client.connect({
    host: fileUploads.ftp.host,
    port: fileUploads.ftp.port,
    user: isPublic ? fileUploads.ftp.publicUser : fileUploads.ftp.privateUser,
    password: isPublic
      ? fileUploads.ftp.publicPassword
      : fileUploads.ftp.privatePassword,
    secure: fileUploads.ftp.secure,
  });
};

module.exports = uploadFileFtp;
