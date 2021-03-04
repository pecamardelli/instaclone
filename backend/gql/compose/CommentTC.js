const { composeMongoose } = require("graphql-compose-mongoose");
const CommentModel = require("../../models/comment");

const customizationOptions = {}; // left it empty for simplicity, described below
const CommentTC = composeMongoose(CommentModel, customizationOptions);

const queries = {
  userById: CommentTC.mongooseResolvers.findById(),
  userByIds: CommentTC.mongooseResolvers.findByIds(),
  userOne: CommentTC.mongooseResolvers.findOne(),
  userMany: CommentTC.mongooseResolvers.findMany(),
  userCount: CommentTC.mongooseResolvers.count(),
  userPagination: CommentTC.mongooseResolvers.pagination(),
};

const mutations = {
  userCreateOne: CommentTC.mongooseResolvers.createOne(),
  userCreateMany: CommentTC.mongooseResolvers.createMany(),
  userUpdateById: CommentTC.mongooseResolvers.updateById(),
  userUpdateOne: CommentTC.mongooseResolvers.updateOne(),
  userUpdateMany: CommentTC.mongooseResolvers.updateMany(),
  userRemoveById: CommentTC.mongooseResolvers.removeById(),
  userRemoveOne: CommentTC.mongooseResolvers.removeOne(),
  userRemoveMany: CommentTC.mongooseResolvers.removeMany(),
};

module.exports = {
  TC: CommentTC,
  queries,
  mutations,
};
