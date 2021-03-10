const { composeMongoose } = require("graphql-compose-mongoose");
const FollowerModel = require("../../models/follower");
const { followerCreateOneWrapper } = require("./wrappers/followerWrappers");

const customizationOptions = {}; // left it empty for simplicity, described below
const FollowerTC = composeMongoose(FollowerModel, customizationOptions);

/**
 * ### ATTENTION ###
 * Having all queries and mutations enabled could be a security risk.
 * In a real world application you must only keep the ones that you need
 * and make sure you shield them!
 * #################
 */

const queries = {
  followerById: FollowerTC.mongooseResolvers.findById(),
  followerByIds: FollowerTC.mongooseResolvers.findByIds(),
  followerOne: FollowerTC.mongooseResolvers.findOne(),
  followerMany: FollowerTC.mongooseResolvers.findMany(),
  followerCount: FollowerTC.mongooseResolvers.count(),
  followerPagination: FollowerTC.mongooseResolvers.pagination(),
};

const mutations = {
  followerCreateOne: FollowerTC.mongooseResolvers
    .createOne()
    .wrapResolve(followerCreateOneWrapper),
  followerCreateMany: FollowerTC.mongooseResolvers.createMany(),
  followerUpdateById: FollowerTC.mongooseResolvers.updateById(),
  followerUpdateOne: FollowerTC.mongooseResolvers.updateOne(),
  followerUpdateMany: FollowerTC.mongooseResolvers.updateMany(),
  followerRemoveById: FollowerTC.mongooseResolvers.removeById(),
  followerRemoveOne: FollowerTC.mongooseResolvers.removeOne(),
  followerRemoveMany: FollowerTC.mongooseResolvers.removeMany(),
};

module.exports = {
  TC: FollowerTC,
  queries,
  mutations,
};
