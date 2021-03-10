const { applyMiddleware } = require("graphql-middleware");
const { shield, and, allow } = require("graphql-shield");
const { isLoggedIn, isAdmin, isDocumentOwner } = require("./ruleBundle");

const permissions = shield(
  {
    Query: {
      "*": and(isLoggedIn),
    },
    Mutation: {
      "*": and(isLoggedIn),
      userLogin: allow,
      userRegister: allow,
      userUpdateById: and(isDocumentOwner),
    },
  },
  {
    debug: true,
    allowExternalErrors: true,
  }
);

const shieldSchema = (schema) => applyMiddleware(schema, permissions);
module.exports = shieldSchema;
