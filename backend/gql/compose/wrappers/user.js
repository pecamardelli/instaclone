const { Types } = require("mongoose");
const { mongodb } = require("../../../config/config");
const FollowerModel = require("../../../models/follower");
const UserModel = require("../../../models/user");

const userManyNotFollowed = () => async (rp) => {
  const { context } = rp;

  const followedArray = await FollowerModel.find({
    userId: context.id,
  });

  const followedIdArray = followedArray.map((f) => f.followId);

  // Adding caller's ID to filter it in the aggregation.
  followedIdArray.push(Types.ObjectId(context.id));

  // Get a sample of random users and spread them to a new set.
  // This is because the $sample operand can return duplicates.
  const randomUsers = [
    ...new Set(
      await UserModel.aggregate([
        { $match: { _id: { $nin: followedIdArray } } },
        { $sample: { size: parseInt(mongodb.sampleSize) } },
      ])
    ),
  ];

  return randomUsers;
};

module.exports = { userManyNotFollowed };
