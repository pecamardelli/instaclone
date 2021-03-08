const {
  PublicationManyByUsernameInput,
} = require("./inputs/publicationInputs");
const { TC: UserTC } = require("../UserTC");

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

  PublicationTC.addResolver({
    name: "publicationManyByUsername",
    type: PublicationTC.mongooseResolvers.findMany().getType(),
    args: {
      filter: PublicationManyByUsernameInput,
    },
    resolve: async ({ source, args, context, info }) => {
      const { username } = args.filter;
      const user = await UserTC.mongooseResolvers
        .findOne()
        .resolve({ args: { filter: { username } } });

      if (!user) throw new Error("Invalid username provided.");

      const publications = await PublicationTC.mongooseResolvers
        .findMany()
        .resolve({ args: { filter: { userId: user._id } } });

      return publications;
    },
  });
};

module.exports = addPublicationCustomResolvers;
