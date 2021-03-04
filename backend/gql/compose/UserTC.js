const { composeMongoose } = require("graphql-compose-mongoose");
const UserModel = require("../../models/user");

const customizationOptions = {}; // left it empty for simplicity, described below
const UserTC = composeMongoose(UserModel, customizationOptions);

const queries = {
  userById: UserTC.mongooseResolvers.findById(),
  userByIds: UserTC.mongooseResolvers.findByIds(),
  userOne: UserTC.mongooseResolvers.findOne(),
  userMany: UserTC.mongooseResolvers.findMany(),
  userCount: UserTC.mongooseResolvers.count(),
  userPagination: UserTC.mongooseResolvers.pagination(),
};

const mutations = {
  userCreateOne: UserTC.mongooseResolvers.createOne(),
  userCreateMany: UserTC.mongooseResolvers.createMany(),
  userUpdateById: UserTC.mongooseResolvers.updateById(),
  userUpdateOne: UserTC.mongooseResolvers.updateOne(),
  userUpdateMany: UserTC.mongooseResolvers.updateMany(),
  userRemoveById: UserTC.mongooseResolvers.removeById(),
  userRemoveOne: UserTC.mongooseResolvers.removeOne(),
  userRemoveMany: UserTC.mongooseResolvers.removeMany(),
};

module.exports = {
  TC: UserTC,
  queries,
  mutations,
};
