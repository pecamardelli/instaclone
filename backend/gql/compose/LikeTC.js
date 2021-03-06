const { composeMongoose } = require("graphql-compose-mongoose");
const LikeModel = require("../../models/like");
const { likeCreateOneWrapper } = require("./wrappers/likeWrappers");

const customizationOptions = {}; // left it empty for simplicity, described below
const LikeTC = composeMongoose(LikeModel, customizationOptions);

const queries = {
  likeById: LikeTC.mongooseResolvers.findById(),
  likeByIds: LikeTC.mongooseResolvers.findByIds(),
  likeOne: LikeTC.mongooseResolvers.findOne(),
  likeMany: LikeTC.mongooseResolvers.findMany(),
  likeCount: LikeTC.mongooseResolvers.count(),
  likePagination: LikeTC.mongooseResolvers.pagination(),
};

const mutations = {
  likeCreateOne: LikeTC.mongooseResolvers
    .createOne()
    .wrapResolve(likeCreateOneWrapper),
  likeCreateMany: LikeTC.mongooseResolvers.createMany(),
  likeUpdateById: LikeTC.mongooseResolvers.updateById(),
  likeUpdateOne: LikeTC.mongooseResolvers.updateOne(),
  likeUpdateMany: LikeTC.mongooseResolvers.updateMany(),
  likeRemoveById: LikeTC.mongooseResolvers.removeById(),
  likeRemoveOne: LikeTC.mongooseResolvers.removeOne(),
  likeRemoveMany: LikeTC.mongooseResolvers.removeMany(),
};

module.exports = {
  TC: LikeTC,
  queries,
  mutations,
};
