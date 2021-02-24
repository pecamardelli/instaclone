const Client = require("ftp");

const uploadFileFtp = (params) => {
  const { data, fileDir, fileName, protocol, isPublic } = params;
  const client = new Client();
  client.on("ready", function () {
    client.put(data, `${fileDir}/${fileName}`, function (err) {
      if (err) {
        client.end();
        throw new Error(`Error uploading ${fileName}: ${err.message}.`);
      }
      client.end();
    });
  });

  client.connect({
    host: protocol.host,
    port: protocol.port,
    user: isPublic ? protocol.publicUsername : protocol.privateUsername,
    password: isPublic ? protocol.publicPassword : protocol.privatePassword,
    secure: protocol.secure,
  });
};

module.exports = uploadFileFtp;
