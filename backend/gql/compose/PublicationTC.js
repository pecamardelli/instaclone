const { composeMongoose } = require("graphql-compose-mongoose");
const PublicationModel = require("../../models/publication");

const customizationOptions = {}; // left it empty for simplicity, described below
const PublicationTC = composeMongoose(PublicationModel, customizationOptions);

const queries = {
  publicationById: PublicationTC.mongooseResolvers.findById(),
  publicationByIds: PublicationTC.mongooseResolvers.findByIds(),
  publicationOne: PublicationTC.mongooseResolvers.findOne(),
  publicationMany: PublicationTC.mongooseResolvers.findMany(),
  publicationCount: PublicationTC.mongooseResolvers.count(),
  publicationPagination: PublicationTC.mongooseResolvers.pagination(),
};

const mutations = {
  publicationCreateOne: PublicationTC.mongooseResolvers.createOne(),
  publicationCreateMany: PublicationTC.mongooseResolvers.createMany(),
  publicationUpdateById: PublicationTC.mongooseResolvers.updateById(),
  publicationUpdateOne: PublicationTC.mongooseResolvers.updateOne(),
  publicationUpdateMany: PublicationTC.mongooseResolvers.updateMany(),
  publicationRemoveById: PublicationTC.mongooseResolvers.removeById(),
  publicationRemoveOne: PublicationTC.mongooseResolvers.removeOne(),
  publicationRemoveMany: PublicationTC.mongooseResolvers.removeMany(),
};

module.exports = {
  TC: PublicationTC,
  queries,
  mutations,
};
