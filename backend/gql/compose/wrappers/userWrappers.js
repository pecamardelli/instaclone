const { Types } = require("mongoose");
const { TC: FollowerTC } = require("../FollowerTC");

const userManyNotFollowed = (next) => async (rp) => {
  const { context } = rp;

  // Get the list of followed users.
  const followerMany = FollowerTC.mongooseResolvers.findMany().resolve;
  const followedUsersList = await followerMany({
    args: { filter: { userId: context.user.id } },
  });

  const followedUsersIdList = followedUsersList.map((f) =>
    Types.ObjectId(f.followId)
  );

  // Push the caller ID to the array of users to exclude.
  followedUsersIdList.push(Types.ObjectId(context.user.id));

  // Modify filter in order to get all users that are not in the array.
  rp.args.filter = { _operators: { _id: { nin: followedUsersIdList } } };

  return next(rp);
};

module.exports = { userManyNotFollowed };
