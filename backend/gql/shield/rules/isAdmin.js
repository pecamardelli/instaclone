const { rule } = require("graphql-shield");
const { ForbiddenError } = require("apollo-server-errors");

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    if (!ctx.user?.isAdmin) throw new ForbiddenError("Error 403: Forbidden.");
    return true;
  }
);

module.exports = isAdmin;
