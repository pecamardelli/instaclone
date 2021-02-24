const PublicationModel = require("../models/publication");
const saveImage = require("../utils/saveImage");

async function publish(file, ctx) {
  console.log({ file, ctx });
  return file
    .then((file) => {
      const { user } = ctx;
      const { createReadStream, mimetype } = file;
      const imageType = mimetype.split("/")[1]; // Should be jpeg or png and equal to the extension...
      const imagePath = `${avatarDir}/${user.id}.${imageType}`;
      const imageData = createReadStream();

      saveImage(imageData, imagePath);

      const newPub = new PublicationModel({
        userId: user.id,
        fileUrl: imagePath,
        fileType: imageType,
      });
      newPub.save();

      return {
        status: true,
        fileUrl: `${user.id}.${imageType}`,
      };
    })
    .catch((err) => {
      return {
        status: false,
        avatarUrl: "",
      };
    });
}

module.exports = {
  publish,
};
