const { composeMongoose } = require("graphql-compose-mongoose");
const PublicationModel = require("../../models/publication");

const customizationOptions = {}; // left it empty for simplicity, described below
const PublicationTC = composeMongoose(PublicationModel, customizationOptions);

const queries = {
  userById: PublicationTC.mongooseResolvers.findById(),
  userByIds: PublicationTC.mongooseResolvers.findByIds(),
  userOne: PublicationTC.mongooseResolvers.findOne(),
  userMany: PublicationTC.mongooseResolvers.findMany(),
  userCount: PublicationTC.mongooseResolvers.count(),
  userPagination: PublicationTC.mongooseResolvers.pagination(),
};

const mutations = {
  userCreateOne: PublicationTC.mongooseResolvers.createOne(),
  userCreateMany: PublicationTC.mongooseResolvers.createMany(),
  userUpdateById: PublicationTC.mongooseResolvers.updateById(),
  userUpdateOne: PublicationTC.mongooseResolvers.updateOne(),
  userUpdateMany: PublicationTC.mongooseResolvers.updateMany(),
  userRemoveById: PublicationTC.mongooseResolvers.removeById(),
  userRemoveOne: PublicationTC.mongooseResolvers.removeOne(),
  userRemoveMany: PublicationTC.mongooseResolvers.removeMany(),
};

module.exports = {
  TC: PublicationTC,
  queries,
  mutations,
};
