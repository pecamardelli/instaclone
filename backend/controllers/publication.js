const PublicationModel = require("../models/publication");
const saveImage = require("../utils/saveImage");
const { fileUploads } = require("../config/config");
const { v4: uuidv4 } = require("uuid");

const { publicDir, baseDir, publicationsDir } = fileUploads.directories;

async function publish(file, ctx) {
  console.log({ file, ctx });
  return file
    .then((file) => {
      const { user } = ctx;
      const { createReadStream, mimetype } = file;
      const imageType = mimetype.split("/")[1]; // Should be jpeg or png and equal to the extension...
      const imageDir = `${publicDir}${baseDir}${publicationsDir}`;
      const imageName = `${uuidv4()}.${imageType}`;
      const imagePath = `${imageDir}/${imageName}`;
      const imageData = createReadStream();

      saveImage(imageData, imagePath);

      const newPub = new PublicationModel({
        userId: user.id,
        fileUrl: imageName,
        fileType: imageType,
      });
      newPub.save();

      return {
        status: true,
        fileUrl: `${imageName}`,
      };
    })
    .catch((err) => {
      return {
        status: false,
        fileUrl: "",
      };
    });
}

module.exports = {
  publish,
};
