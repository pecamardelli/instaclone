const addPublicationCustomResolvers = (PublicationTC) => {
  // This extends the input type for Publication in order to accept an Upload type on args.
  PublicationTC.addResolver({
    name: "_publicationCreateOne",
    type: PublicationTC.mongooseResolvers.createOne().getType(),
    args: {
      file: "Upload!",
      record: PublicationTC.mongooseResolvers.createOne().getArgs().record,
    },
    resolve: ({ source, args, context, info }) => {
      const resolver = PublicationTC.mongooseResolvers.createOne().resolve;
      return resolver({ source, args, context, info });
    },
  });
};

module.exports = addPublicationCustomResolvers;
