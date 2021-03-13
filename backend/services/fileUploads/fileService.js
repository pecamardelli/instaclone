const { v4: uuidv4 } = require("uuid");
const uploadFileFtp = require("./helpers/uploadFileFtp");
const upoladFileSftp = require("./helpers/uploadFileSftp");
const { fileUploads } = require("../../config/config");

const {
  publicDir,
  baseDir,
  userDir,
  userAvatarDir,
  publicationsDir,
} = fileUploads.directories;

const getSizeInMbytes = (size) => {
  // Return the size in mbytes with one decimal digit.
  return Math.round((size / 1048576) * 10) / 10;
};

//const fileUploadHandler = async (file, baseDir, dirname, protocol, isPublic) => {
const fileUploadHandler = async (params) => {
  const { callerId, file, uploadType, isPublic = true } = params;
  let filePath;
  let fileName;
  let fileExtension;

  if (!callerId) throw new Error("Caller ID not provided.");
  if (!file) throw new Error("File data not provided.");
  if (!uploadType) throw new Error("Upload type not provided.");

  // Check if file is a promise. If so, it means that it's a stream.
  if (Promise.resolve(file) === file) {
    const { createReadStream, mimetype } = await file;
    const splittedMimeType = mimetype.split("/");
    readStream = createReadStream();
    fileExtension = splittedMimeType.length > 1 ? splittedMimeType[1] : "none"; // Should be jpeg or png and equal to the extension...
    const chunkArray = [];

    switch (uploadType) {
      case "avatar":
        filePath = `${publicDir}${baseDir}${userDir}${userAvatarDir}`;
        fileName = `${callerId}`;
        break;
      case "publication":
        filePath = `${publicDir}${baseDir}${publicationsDir}`;
        fileName = `${uuidv4()}`;
        break;
      default:
        break;
    }

    readStream.on("readable", () => {
      // Read stream data and store it in an array.
      let chunk;
      let streamSize = 0;
      while (null !== (chunk = readStream.read())) {
        chunkArray.push(chunk);
        streamSize += chunk.length;
        if (streamSize > fileUploads.maxUploadSize) {
          throw new Error(
            `File size exceeded: must be less or equal than ${getSizeInMbytes(
              fileUploads.maxUploadSize
            )}Mbytes.`
          );
        }
      }
    });

    readStream.on("end", () => {
      const data = Buffer.concat(chunkArray);

      const uploadOptions = {
        data,
        filePath,
        fileName: `${fileName}.${fileExtension}`,
        isPublic,
      };

      switch (fileUploads.protocol) {
        case "sftp":
          upoladFileSftp(uploadOptions);
          break;
        case "ftp":
          uploadFileFtp(uploadOptions);
          break;
        default:
          break;
      }
    });

    return { fileName, fileExtension };
  } else throw new Error("Not implemented...");
};

module.exports = fileUploadHandler;
