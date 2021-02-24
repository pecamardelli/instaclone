const client = require('ssh2').Client;
const { error } = require("../../config/errors");

// This handy function was found at https://gist.github.com/lucamug/203931a35143ad7ef09c239ade4411bc
const upoladFileSftp = (params) => {
    const { data, fileDir, fileName, protocol, isPublic } = params;
    const conn = new client();
	conn.on('ready', function (err) {
        if (err) throw error.INTERNAL_SERVER_ERROR(`No se pudo actualizar el avatar.`, {
            extra: {},
            internal: { error: err.message || err.text || "Could not connect to SFTP host." },
            source: "upoladFileSftp()",
          });
		conn.sftp(function (err, sftp) {
			if (err) {
                conn.end();
                throw error.INTERNAL_SERVER_ERROR(`No se pudo actualizar el avatar.`, {
                    extra: {},
                    internal: { error: `Could not open SFTP session: ${err.message || err.text}` },
                    source: "upoladFileSftp()",
                });
            }
            sftp.readdir(fileDir, function (err) {
                // If the directory doesn't exists, throw an error and close the connection;
                if (err) {
                    conn.end();
                    throw error.BAD_REQUEST(`No se pudo actualizar el avatar.`, {
                        extra: {},
                        internal: { error: `Could not read directory ${fileDir}: ${err.message || err.text}` },
                        source: "upoladFileSftp()",
                    });
                }
                const writeStream = sftp.createWriteStream(`${fileDir}/${fileName}`, { mode: 0100664 });
                try { writeStream.write(data) }
                catch (err) {
                    conn.end();
                    throw error.INTERNAL_SERVER_ERROR(`No se pudo actualizar el avatar.`, {
                        extra: {},
                        internal: { error: `Could not write buffer to SFTP destination: ${err.message || err.text}` },
                        source: "upoladFileSftp()",
                    });
                };
                writeStream.on('close', () => {
                    conn.end();
                });
			});
		});
	}).connect({
        host: protocol.host,
        port: protocol.port,
        username: isPublic ? protocol.publicUsername : protocol.privateUsername,
        password: isPublic ? protocol.publicPassword : protocol.privatePassword,
    });
}

module.exports = upoladFileSftp;