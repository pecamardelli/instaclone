const { applyMiddleware } = require("graphql-middleware");
const {
  rule,
  inputRule,
  shield,
  chain,
  and,
  or,
  not,
  deny,
  allow,
} = require("graphql-shield");

const isLoggedIn = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return true;
  }
);

const permissions = shield(
  {
    Query: {
      "*": and(isLoggedIn),
    },
    Mutation: {
      "*": and(isLoggedIn),
    },
  },
  {
    debug: true,
    allowExternalErrors: true,
  }
);

const shieldedSchema = applyMiddleware(schema, permissions);
module.exports = shieldedSchema;
