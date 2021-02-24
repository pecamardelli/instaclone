const uploadFileFtp = require("./uploadFileFtp");
const upoladFileSftp = require("./uploadFileSftp");
const { fileUploads } = require("../../config/config");
const crypto = require("crypto");

const getSizeInMbytes = (size) => {
  // Return the size in mbytes with one decimal digit.
  return Math.round((size / 1048576) * 10) / 10;
};

//const fileUploadHandler = async (file, baseDir, dirname, protocol, isPublic) => {
const fileUploadHandler = async (params) => {
  //console.dir({baseDir, dirname, protocol})
  if (!params.baseDir) return "Base path missing.";
  if (!params.hashedDirName) return "Dir name missing.";
  if (!params.subDir) return "Sub directory name missing.";

  // Check if file is a promise. If so, it means that it's a stream.
  if (Promise.resolve(params.file) === params.file) {
    ///console.log("It's a promise");
    const { createReadStream, mimetype } = await params.file;
    const splittedMimeType = mimetype.split("/");
    readStream = createReadStream();
    const fileExtension =
      splittedMimeType.length > 1 ? splittedMimeType[1] : "none"; // Should be jpeg or png and equal to the extension...
    const hash = crypto.createHash("sha256");
    const chunkArray = [];

    readStream
      .on("readable", () => {
        // Read stream data and store it in an array.
        let chunk;
        let streamSize = 0;
        while (null !== (chunk = readStream.read())) {
          //console.log(`Received ${chunk.length} bytes of data.`);
          chunkArray.push(chunk);
          streamSize += chunk.length;
          if (streamSize > fileUploads.maxUploadSize) {
            throw new Error(
              `El tamaño del archivo no debe superar los ${getSizeInMbytes(
                fileUploads.maxUploadSize
              )}Mbytes.`
            );
          }
        }
      })
      .catch((error) => error);

    readStream
      .on("end", () => {
        const data = Buffer.concat(chunkArray);
        hash.update(data);
        const digested = hash.digest("hex");
        const fileDir = `${params.baseDir}/${params.hashedDirName}/${params.subDir}`;
        const fileName = `${digested}.${fileExtension}`;
        const { protocol, isPublic } = params;

        const uploadOptions = {
          data,
          fileDir,
          fileName,
          protocol,
          isPublic,
        };

        switch (protocol.name) {
          case "sftp":
            upoladFileSftp(uploadOptions);
            break;
          case "ftp":
            uploadFileFtp(uploadOptions);
            break;
          default:
            break;
        }
      })
      .catch((error) => error);
  } else throw new Error("Not implemented...");
};

module.exports = fileUploadHandler;
