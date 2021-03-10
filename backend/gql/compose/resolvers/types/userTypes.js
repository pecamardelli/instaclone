const { schemaComposer } = require("graphql-compose");

const UserLoginPayload = schemaComposer.createObjectTC(`
    type UserLoginPayload {
      token: String
    }
`);

module.exports = {
  UserLoginPayload,
};
