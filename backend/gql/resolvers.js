const {
  registerUser,
  loginUser,
  getUser,
  updateAvatar,
  deleteAvatar,
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
    updateAvatar: (_, { file }, ctx) => updateAvatar(file, ctx),
    deleteAvatar: (_, {}, ctx) => deleteAvatar(ctx),
  },
};

module.exports = resolvers;
