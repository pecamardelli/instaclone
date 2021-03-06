const { composeMongoose } = require("graphql-compose-mongoose");
const CommentModel = require("../../models/comment");
const { commentCreateOneWrapper } = require("./wrappers/commentWrappers");

const customizationOptions = {}; // left it empty for simplicity, described below
const CommentTC = composeMongoose(CommentModel, customizationOptions);

const queries = {
  commentById: CommentTC.mongooseResolvers.findById(),
  commentByIds: CommentTC.mongooseResolvers.findByIds(),
  commentOne: CommentTC.mongooseResolvers.findOne(),
  commentMany: CommentTC.mongooseResolvers.findMany(),
  commentCount: CommentTC.mongooseResolvers.count(),
  commentPagination: CommentTC.mongooseResolvers.pagination(),
};

const mutations = {
  commentCreateOne: CommentTC.mongooseResolvers
    .createOne()
    .wrapResolve(commentCreateOneWrapper),
  //commentCreateMany: CommentTC.mongooseResolvers.createMany(),
  commentUpdateById: CommentTC.mongooseResolvers.updateById(),
  commentUpdateOne: CommentTC.mongooseResolvers.updateOne(),
  commentUpdateMany: CommentTC.mongooseResolvers.updateMany(),
  commentRemoveById: CommentTC.mongooseResolvers.removeById(),
  commentRemoveOne: CommentTC.mongooseResolvers.removeOne(),
  commentRemoveMany: CommentTC.mongooseResolvers.removeMany(),
};

module.exports = {
  TC: CommentTC,
  queries,
  mutations,
};
