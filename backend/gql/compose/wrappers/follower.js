const UserModel = require("../../../models/user");
const FollowerModel = require("../../../models/follower");

const followerCreateOneWrapper = (next) => async (rp) => {
  const { record } = rp.args;
  const { context } = rp;

  if (record.followId === context.id)
    throw new Error("You can't follow yourself.");

  const userToFollow = await UserModel.findOne({ _id: record.followId });
  if (!userToFollow) throw new Error("User to follow not found");

  const existentFollowDoc = await FollowerModel.findOne({
    userId: context.id,
  })
    .where("followId")
    .equals(userToFollow._id);

  if (existentFollowDoc)
    throw new Error("You are already following this user.");

  // Replace the publication's userId for the one in the context.
  record.userId = context.id;

  return next(rp);
};

module.exports = {
  followerCreateOneWrapper,
};
