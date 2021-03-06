const { schemaComposer } = require("graphql-compose");

const UserLoginInput = schemaComposer.createInputTC(`
  input UserLoginInput {
    email: String!
    password: String!
  }
`);

module.exports = {
  UserLoginInput,
};
