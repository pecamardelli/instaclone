const {
  registerUser,
  loginUser,
  getUser,
  updateAvatar,
} = require("../controllers/user");

const resolvers = {
  Query: {
    // User
    getUser: (_, { id, username }) => getUser(id, username),
  },
  Mutation: {
    // User
    registerUser: (_, { input }) => registerUser(input),
    loginUser: (_, { input }) => loginUser(input),
    updateAvatar: (_, { file }) => updateAvatar(file),
  },
};

module.exports = resolvers;
