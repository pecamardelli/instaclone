const { composeMongoose } = require("graphql-compose-mongoose");
const PublicationModel = require("../../models/publication");
const { publicationCreateOneWrapper } = require("./wrappers/publication");

const customizationOptions = {}; // left it empty for simplicity, described below
const PublicationTC = composeMongoose(PublicationModel, customizationOptions);

// This extends the input type for Publication in order to accept a Upload in the args.
PublicationTC.addResolver({
  name: "_publicationCreateOne",
  type: PublicationTC.getType(),
  args: {
    file: "Upload!",
    record: PublicationTC.getInputType("CreateOnePublicationInput!"),
  },
  resolve: ({ source, args, context, info }) => {
    const resolver = PublicationTC.mongooseResolvers.createOne().resolve;
    return resolver({ source, args, context, info });
  },
});

const queries = {
  publicationById: PublicationTC.mongooseResolvers.findById(),
  publicationByIds: PublicationTC.mongooseResolvers.findByIds(),
  publicationOne: PublicationTC.mongooseResolvers.findOne(),
  publicationMany: PublicationTC.mongooseResolvers.findMany(),
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
