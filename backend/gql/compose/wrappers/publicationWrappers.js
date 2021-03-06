const saveImage = require("../../../utils/saveImage");
const { fileUploads } = require("../../../config/config");
const { v4: uuidv4 } = require("uuid");

const publicationCreateOneWrapper = (next) => async (rp) => {
  const { publicDir, baseDir, publicationsDir } = fileUploads.directories;
  const { record, file } = rp.args;
  const { context } = rp;

  const { createReadStream, mimetype } = await file;
  const splittedMime = typeof mimetype === "string" && mimetype.split("/"); // Should be jpeg or png and equal to the extension...
  const imageType = `${
    Array.isArray(splittedMime) && splittedMime.length > 1
      ? splittedMime[1]
      : ".none"
  }`;
  const imageDir = `${publicDir}${baseDir}${publicationsDir}`;
  const imageName = `${uuidv4()}.${imageType}`;
  const imagePath = `${imageDir}/${imageName}`;
  const imageData = createReadStream();

  await saveImage(imageData, imagePath);

  record.fileUrl = `${imageName}`;
  record.fileType = s`${imageType}`;
  console.dir(record);
  return next(rp);
};

module.exports = {
  publicationCreateOneWrapper,
};
