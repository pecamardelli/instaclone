const { rule } = require("graphql-shield");
const { AuthenticationError } = require("apollo-server-errors");

const isLoggedIn = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    if (!ctx.user?.id) throw new AuthenticationError("Unauthorized");
    return true;
  }
);

module.exports = isLoggedIn;
