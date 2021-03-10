const { composeMongoose } = require("graphql-compose-mongoose");
const UserModel = require("../../models/user");
const addUserCustomResolvers = require("./resolvers/userResolvers");
const { userManyNotFollowed } = require("./wrappers/userWrappers");

const customizationOptions = {}; // left it empty for simplicity, described below
const UserTC = composeMongoose(UserModel, customizationOptions);

// Why would someone query the password field?
UserTC.removeField("password");
// Adding custom resolvers to type composer.
addUserCustomResolvers(UserTC);

const queries = {
  userById: UserTC.mongooseResolvers.findById(),
  userByIds: UserTC.mongooseResolvers.findByIds(),
  userOne: UserTC.mongooseResolvers.findOne(),
  userMany: UserTC.mongooseResolvers.findMany(),
  userManyNotFollowed: UserTC.mongooseResolvers
    .findMany()
    .wrapResolve(userManyNotFollowed),
  userCount: UserTC.mongooseResolvers.count(),
  userPagination: UserTC.mongooseResolvers.pagination(),
};

const mutations = {
  userRegister: UserTC.getResolver("userRegister"),
  userLogin: UserTC.getResolver("userLogin"),
  userUpdateById: UserTC.mongooseResolvers.updateById(),
  userUpdateOne: UserTC.mongooseResolvers.updateOne(),
  userUpdateMany: UserTC.mongooseResolvers.updateMany(),
  userUpdateAvatar: UserTC.getResolver("userUpdateAvatar"),
  userRemoveById: UserTC.mongooseResolvers.removeById(),
  userRemoveOne: UserTC.mongooseResolvers.removeOne(),
  userRemoveMany: UserTC.mongooseResolvers.removeMany(),
};

module.exports = {
  TC: UserTC,
  queries,
  mutations,
};
