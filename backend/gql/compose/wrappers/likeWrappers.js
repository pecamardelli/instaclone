const LikeModel = require("../../../models/like");
const { TC: PublicationTC } = require("../PublicationTC");

const likeCreateOneWrapper = (next) => async (rp) => {
  const { record } = rp.args;
  const { context } = rp;

  if (!record.publicationId) throw new Error("Publication ID is not defined.");
  if (!context.id) throw new Error("No user provided in context.");

  const publicationExists = await PublicationTC.mongooseResolvers
    .findById()
    .resolve({ args: { _id: record.publicationId } });

  if (!publicationExists) throw new Error("Invalid publication ID.");

  // Can't import LikeTC because it will be a circular dependency.
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
