const { composeMongoose } = require("graphql-compose-mongoose");
const PublicationModel = require("../../models/publication");
const addPublicationCustomResolvers = require("./resolvers/publicationResolvers");
const {
  publicationCreateOneWrapper,
  publicationManyOfFolloweds,
} = require("./wrappers/publicationWrappers");

const customizationOptions = {}; // Left it empty for simplicity
const PublicationTC = composeMongoose(PublicationModel, customizationOptions);

addPublicationCustomResolvers(PublicationTC);

const queries = {
  publicationById: PublicationTC.mongooseResolvers.findById(),
  publicationByIds: PublicationTC.mongooseResolvers.findByIds(),
  publicationOne: PublicationTC.mongooseResolvers.findOne(),
  publicationMany: PublicationTC.mongooseResolvers.findMany(),
  publicationManyOfFolloweds: PublicationTC.mongooseResolvers
    .findMany()
    .wrapResolve(publicationManyOfFolloweds),
  publicationManyByUsername: PublicationTC.getResolver(
    "publicationManyByUsername"
  ),
  publicationCount: PublicationTC.mongooseResolvers.count(),
  publicationPagination: PublicationTC.mongooseResolvers.pagination(),
};

const mutations = {
  //publicationCreateOne: PublicationTC.mongooseResolvers.createOne(),
  publicationCreateOne: PublicationTC.getResolver(
    "_publicationCreateOne"
  ).wrapResolve(publicationCreateOneWrapper),
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
