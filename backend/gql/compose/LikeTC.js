const { composeMongoose } = require("graphql-compose-mongoose");
const LikeModel = require("../../models/like");

const customizationOptions = {}; // left it empty for simplicity, described below
const LikeTC = composeMongoose(LikeModel, customizationOptions);

const queries = {
  userById: LikeTC.mongooseResolvers.findById(),
  userByIds: LikeTC.mongooseResolvers.findByIds(),
  userOne: LikeTC.mongooseResolvers.findOne(),
  userMany: LikeTC.mongooseResolvers.findMany(),
  userCount: LikeTC.mongooseResolvers.count(),
  userPagination: LikeTC.mongooseResolvers.pagination(),
};

const mutations = {
  userCreateOne: LikeTC.mongooseResolvers.createOne(),
  userCreateMany: LikeTC.mongooseResolvers.createMany(),
  userUpdateById: LikeTC.mongooseResolvers.updateById(),
  userUpdateOne: LikeTC.mongooseResolvers.updateOne(),
  userUpdateMany: LikeTC.mongooseResolvers.updateMany(),
  userRemoveById: LikeTC.mongooseResolvers.removeById(),
  userRemoveOne: LikeTC.mongooseResolvers.removeOne(),
  userRemoveMany: LikeTC.mongooseResolvers.removeMany(),
};

module.exports = {
  TC: LikeTC,
  queries,
  mutations,
};
