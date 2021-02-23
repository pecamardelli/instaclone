const {
  followUser,
  isFollowing,
  unfollowUser,
  getFollowers,
  getFolloweds,
} = require("../controllers/follower");
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

    // Followers system resolvers
    isFollowing: (_, { username }, ctx) => isFollowing(username, ctx),
    getFollowers: (_, { username }, ctx) => getFollowers(username, ctx),
    getFolloweds: (_, { username }, ctx) => getFolloweds(username, ctx),
  },
  Mutation: {
    // User
    registerUser: (_, { input }) => registerUser(input),
    loginUser: (_, { input }) => loginUser(input),
    updateAvatar: (_, { file }, ctx) => updateAvatar(file, ctx),
    deleteAvatar: (_, {}, ctx) => deleteAvatar(ctx),
    updateUser: (_, { input }, ctx) => updateUser(input, ctx),

    // Followers
    followUser: (_, { username }, ctx) => followUser(username, ctx),
    unfollowUser: (_, { username }, ctx) => unfollowUser(username, ctx),
  },
};

module.exports = resolvers;
