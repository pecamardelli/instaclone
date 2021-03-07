const { schemaComposer } = require("graphql-compose");

const UserLoginInput = schemaComposer.createInputTC(`
  input UserLoginInput {
    email: String!
    password: String!
  }
`);

const UserRegisterInput = schemaComposer.createInputTC(`
  input UserRegisterInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }
`);

module.exports = {
  UserLoginInput,
  UserRegisterInput,
};
