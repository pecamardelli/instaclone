const { rule } = require("graphql-shield");
const { ForbiddenError } = require("apollo-server-errors");

const isSiteOwner = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    if (ctx.user?.role !== "siteOwner")
      throw new ForbiddenError("Error 403: Forbidden.");
    return true;
  }
);

module.exports = isSiteOwner;
