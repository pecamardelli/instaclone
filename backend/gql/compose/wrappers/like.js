const LikeModel = require("../../../models/like");

const likeCreateOneWrapper = (next) => async (rp) => {
  const { record } = rp.args;
  const { context } = rp;

  if (!record.publicationId) throw new Error("Publication ID is not defined.");
  if (!context.id) throw new Error("No user provided in context.");

  const alreadyLiked = await LikeModel.findOne({
    userId: context.id,
    publicationId: record.publicationId,
  });

  if (alreadyLiked) throw new Error("You already like this publication.");

  return next(rp);
};

module.exports = {
  likeCreateOneWrapper,
};
