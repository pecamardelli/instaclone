const FollowerModel = require("../models/follower");
const UserModel = require("../models/user");
const { mongodb } = require("../config/config");

// ######### HELPER FUNCTION ######### //
// Check if username exists an it's being followed by caller.
const preliminaryChecks = async (username, ctx) => {
  try {
    if (username === ctx.user.username)
      throw new Error("Can't (un)follow yourself.");

    const userToFollow = await UserModel.findOne({ username });
    if (!userToFollow) throw new Error("User to follow not found");

    const existentFollowDoc = await FollowerModel.findOne({
      userId: ctx.user.id,
    })
      .where("followId")
      .equals(userToFollow._id);

    // console.dir({
    //   existentFollowDoc,
    //   ctx,
    //   userToFollow: userToFollow._id.toString(),
    // });

    if (existentFollowDoc)
      return { isFollowing: true, followedId: existentFollowDoc.followId };

    return userToFollow;
  } catch (error) {
    console.error(error);
    return false;
  }
};
// ################################### //

async function followUser(username, ctx) {
  if (username === ctx.user.username)
    throw new Error("Can't (un)follow yourself.");

  const userToFollow = await UserModel.findOne({ username });
  if (!userToFollow) throw new Error("User to follow not found");
  // If 'username' is already being followed, return true and move on.
  const existentFollowDoc = await FollowerModel.findOne({
    userId: ctx.user.id,
  })
    .where("followId")
    .equals(userToFollow._id);
  if (existentFollowDoc) return true;

  try {
    const followerDoc = new FollowerModel({
      userId: ctx.user.id,
      followId: userToFollow._id,
    });
    followerDoc.save();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function isFollowing(username, ctx) {
  if (username === ctx.user.username)
    throw new Error("Can't (un)follow yourself.");

  const userToFollow = await UserModel.findOne({ username });
  if (!userToFollow) throw new Error("User to follow not found");

  const existentFollowDoc = await FollowerModel.findOne({
    userId: ctx.user.id,
  })
    .where("followId")
    .equals(userToFollow._id);

  if (existentFollowDoc) return true;
  return false;
}

async function unfollowUser(username, ctx) {
  const { followedId } = await preliminaryChecks(username, ctx);
  try {
    if (followedId) {
      const unfollow = await FollowerModel.deleteOne({ userId: ctx.user.id })
        .where("followId")
        .equals(followedId);

      console.dir({ unfollow, followedId: followedId.toString(), ctx });
      if (unfollow.deletedCount > 0) return true;

      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getFollowers(username) {
  try {
    const userToGetFollowers = await UserModel.findOne({ username });

    const followerList = await FollowerModel.find({
      followId: userToGetFollowers._id,
    }).populate("userId");

    return followerList.map((f) => f.userId);
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getFolloweds(username, ctx) {
  try {
    const userToGetFolloweds = await UserModel.findOne({ username });
    const followedList = await FollowerModel.find({
      userId: userToGetFolloweds._id,
    }).populate("followId");

    return followedList.map((f) => f.followId);
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getNotFolloweds(ctx) {
  if (!ctx.user) throw new Error("User is not defined in context.");
  const followedList = await getFolloweds(ctx.user.username);

  // Get a sample of random users and spread them to a new set.
  // This is because the $sample operand can return duplicates.
  const randomUsers = [
    ...new Set(
      await UserModel.aggregate([
        { $sample: { size: parseInt(mongodb.sampleSize) } },
      ])
    ),
  ];

  const notFollowedList = randomUsers.filter(
    (user) =>
      user._id.toString() !== ctx.user.id &&
      !followedList.find((f) => f._id.toString() === user._id.toString())
  );

  return notFollowedList;
}

module.exports = {
  followUser,
  isFollowing,
  unfollowUser,
  getFollowers,
  getFolloweds,
  getNotFolloweds,
};
