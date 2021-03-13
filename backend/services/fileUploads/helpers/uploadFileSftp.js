const client = require("ssh2").Client;

// This handy function was found at https://gist.github.com/lucamug/203931a35143ad7ef09c239ade4411bc
const upoladFileSftp = (params) => {
  const { data, fileDir, fileName, protocol, isPublic } = params;
  const conn = new client();
  conn
    .on("ready", function (err) {
      if (err) throw new Error(err.message);

      conn.sftp(function (err, sftp) {
        if (err) {
          conn.end();
          throw new Error(err.message);
        }

        sftp.readdir(fileDir, function (err) {
          // If the directory doesn't exists, throw an error and close the connection;
          if (err) {
            conn.end();
            throw new Error(err.message);
          }

          const writeStream = sftp.createWriteStream(`${fileDir}/${fileName}`, {
            mode: 0100664,
          });

          try {
            writeStream.write(data);
          } catch (err) {
            conn.end();
            throw new Error(err.message);
          }
          writeStream.on("close", () => {
            conn.end();
          });
        });
      });
    })
    .connect({
      host: protocol.host,
      port: protocol.port,
      username: isPublic ? protocol.publicUsername : protocol.privateUsername,
      password: isPublic ? protocol.publicPassword : protocol.privatePassword,
    });
};

module.exports = upoladFileSftp;
