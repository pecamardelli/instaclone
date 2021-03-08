const { schemaComposer } = require("graphql-compose");

const PublicationManyByUsernameInput = schemaComposer.createInputTC(`
  input PublicationManyByUsernameInput {
    username: String!
  }
`);

module.exports = {
  PublicationManyByUsernameInput,
};
