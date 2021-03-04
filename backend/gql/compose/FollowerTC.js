const { composeMongoose } = require("graphql-compose-mongoose");
const FollowerModel = require("../../models/follower");

const customizationOptions = {}; // left it empty for simplicity, described below
const FollowerTC = composeMongoose(FollowerModel, customizationOptions);

const queries = {
  userById: FollowerTC.mongooseResolvers.findById(),
  userByIds: FollowerTC.mongooseResolvers.findByIds(),
  userOne: FollowerTC.mongooseResolvers.findOne(),
  userMany: FollowerTC.mongooseResolvers.findMany(),
  userCount: FollowerTC.mongooseResolvers.count(),
  userPagination: FollowerTC.mongooseResolvers.pagination(),
};

const mutations = {
  userCreateOne: FollowerTC.mongooseResolvers.createOne(),
  userCreateMany: FollowerTC.mongooseResolvers.createMany(),
  userUpdateById: FollowerTC.mongooseResolvers.updateById(),
  userUpdateOne: FollowerTC.mongooseResolvers.updateOne(),
  userUpdateMany: FollowerTC.mongooseResolvers.updateMany(),
  userRemoveById: FollowerTC.mongooseResolvers.removeById(),
  userRemoveOne: FollowerTC.mongooseResolvers.removeOne(),
  userRemoveMany: FollowerTC.mongooseResolvers.removeMany(),
};

module.exports = {
  TC: FollowerTC,
  queries,
  mutations,
};
