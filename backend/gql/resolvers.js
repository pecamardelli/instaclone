const {
  registerUser,
  loginUser,
  getUser,
  updateAvatar,
  deleteAvatar,
  updateUser,
  search,
} = require("../controllers/user");

const resolvers = {
  Query: {
    // User
    getUser: (_, { id, username }) => getUser(id, username),
    search: (_, { keyword }) => search(keyword),
  },
  Mutation: {
    // User
    registerUser: (_, { input }) => registerUser(input),
    loginUser: (_, { input }) => loginUser(input),
    updateAvatar: (_, { file }, ctx) => updateAvatar(file, ctx),
    deleteAvatar: (_, {}, ctx) => deleteAvatar(ctx),
    updateUser: (_, { input }, ctx) => updateUser(input, ctx),
  },
};

module.exports = resolvers;
