const { applyMiddleware } = require("graphql-middleware");
const { shield, and } = require("graphql-shield");
const rules = require("./rules");

const permissions = shield(
  {
    Query: {
      "*": and(rules.isLoggedIn),
    },
    Mutation: {
      "*": and(rules.isLoggedIn),
    },
  },
  {
    debug: true,
    allowExternalErrors: true,
  }
);

const shieldSchema = (schema) => applyMiddleware(schema, permissions);
module.exports = shieldSchema;
