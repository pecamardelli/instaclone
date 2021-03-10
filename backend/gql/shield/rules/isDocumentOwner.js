const { rule } = require("graphql-shield");
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} = require("apollo-server-errors");

const isDocumentOwner = rule({ cache: "contextual" })(
  (parent, args, ctx, info) => {
    const idFromContext = ctx.user && ctx.user.id;
    const idFromArgs = args._id;

    // Is there a user object in the context?
    if (!idFromContext)
      throw new AuthenticationError("Error 401: Unauthorized.");

    // Has the client provided an ID?
    if (!idFromArgs) throw new UserInputError("Error 400: Bad request.");

    // Finally: are thoose IDs the same?
    if (idFromContext !== idFromArgs)
      throw new ForbiddenError("Error 403: Illegal operation.");

    return true;
  }
);

module.exports = isDocumentOwner;
