const { mongodb } = require("../../../config/config");
const { TC: FollowerTC } = require("../FollowerTC");
const UserModel = require("../../../models/user");

// const publicationCreateOneWrapper = async (next) => (rp) => {
//   const { publicDir, baseDir, publicationsDir } = fileUploads.directories;
//   const { record, file } = rp.args;
//   const { context } = rp;

//   const { createReadStream, mimetype } = await file;
//   const splittedMime = typeof mimetype === "string" && mimetype.split("/"); // Should be jpeg or png and equal to the extension...
//   const imageType = `${
//     Array.isArray(splittedMime) && splittedMime.length > 1
//       ? splittedMime[1]
//       : ".none"
//   }`;
//   const imageDir = `${publicDir}${baseDir}${publicationsDir}/${context.user.id}`;
//   const imageName = `${uuidv4()}.${imageType}`;
//   const imagePath = `${imageDir}/${imageName}`;
//   const imageData = createReadStream();

//   await saveFile(imageData, imagePath);

//   record.fileUrl = `${imageName}`;
//   record.fileType = s`${imageType}`;
//   return next(rp);
// };

const publicationManyOfFolloweds = (next) => async (rp) => {
  const { context } = rp;

  // First of all, we need to retrieve all the IDs of the users followed by caller.
  const followerFindMany = FollowerTC.mongooseResolvers.findMany().resolve;
  const listOfUsersFollowedByCaller = await followerFindMany({
    args: { filter: { userId: context.user.id } },
  });

  let mappedList;
  if (listOfUsersFollowedByCaller.length === 0) {
    // If no users are followed, return some publications of a random set of users.
    // Get a sample of random users and spread them to a new set.
    // This is because the $sample operand can return duplicates.
    const randomUsers = [
      ...new Set(
        await UserModel.aggregate([
          { $match: { _id: { $ne: context.user.id } } }, // Exclude the caller id.
          { $sample: { size: parseInt(mongodb.sampleSize) } },
        ])
      ),
    ];

    mappedList = randomUsers.map((u) => ({
      userId: u._id,
    }));
  } else {
    mappedList = listOfUsersFollowedByCaller.map((f) => ({
      userId: f.followId,
    }));
  }

  // Now we modify the filter argument.
  rp.args.filter = { OR: mappedList };

  return next(rp);
};

module.exports = {
  //publicationCreateOneWrapper,
  publicationManyOfFolloweds,
};
