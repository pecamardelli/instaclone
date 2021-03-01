const LikeModel = require("../models/like");
const objectIdValidator = require("../utils/objectIdValidator");

async function doLike(publicationId, ctx) {
  try {
    // No need to check validity of publicationId because the hasLiked funtction will do it.
    if (await hasLiked(publicationId, ctx))
      throw new Error("Cannot like the same publication twice.");

    const newLike = new LikeModel({
      publicationId,
      userId: ctx.user.id,
    });
    await newLike.save();
    return newLike;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function removeLike(publicationId, ctx) {
  try {
    if (!objectIdValidator(publicationId))
      throw new Error("Publication ID is not a valid ObjectID.");

    await LikeModel.findOneAndDelete({ publicationId }).where({
      userId: ctx.user.id,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function hasLiked(publicationId, ctx) {
  try {
    if (!objectIdValidator(publicationId))
      throw new Error("Publication ID is not a valid ObjectID.");

    const result = await LikeModel.findOne({ publicationId }).where({
      userId: ctx.user.id,
    });

    return !!result;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function likeCount(publicationId) {
  if (!objectIdValidator(publicationId))
    throw new Error("Publication ID is not a valid ObjectID.");

  try {
    return await LikeModel.countDocuments({ publicationId });
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  doLike,
  removeLike,
  hasLiked,
  likeCount,
};
