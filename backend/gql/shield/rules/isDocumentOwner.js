const { rule } = require("graphql-shield");
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} = require("apollo-server-errors");

const isDocumentOwner = rule({ cache: "contextual" })(
  (parent, args, ctx, info) => {
    const idFromContext = ctx.user && ctx.user.id;

    // The ID provided by the client can be found directly inside args object
    // or nested into a record object. Some mutations use one or the other approach.
    const idFromArgs = args._id || undefined; // When it is inside args object directly, it has the _id key
    const idFromRecord = args.record ? args.record.userId : undefined;
    const idProvided = idFromArgs || idFromRecord;

    // Is there a user object in the context?
    if (!idFromContext)
      throw new AuthenticationError("Error 401: Unauthorized.");

    // Has the client provided an ID?
    if (!idProvided) throw new UserInputError("Error 400: Bad request.");

    // Finally: are thoose IDs the same?
    if (idFromContext !== idProvided)
      throw new ForbiddenError("Error 403: Illegal operation.");

    return true;
  }
);

module.exports = isDocumentOwner;
