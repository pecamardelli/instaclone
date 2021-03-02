const {
  followUser,
  isFollowing,
  unfollowUser,
  getFollowers,
  getFolloweds,
  getNotFolloweds,
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
const {
  publish,
  getPublications,
  getFollowedPublications,
} = require("../controllers/publication");
const { addComment, getComments } = require("../controllers/comment");
const {
  doLike,
  removeLike,
  hasLiked,
  likeCount,
} = require("../controllers/like");

const resolvers = {
  Query: {
    // User
    getUser: (_, { id, username }) => getUser(id, username),
    search: (_, { keyword }) => search(keyword),

    // Followers system resolvers
    isFollowing: (_, { username }, ctx) => isFollowing(username, ctx),
    getFollowers: (_, { username }) => getFollowers(username),
    getFolloweds: (_, { username }, ctx) => getFolloweds(username, ctx),
    getNotFolloweds: (_, {}, ctx) => getNotFolloweds(ctx),

    // Publication resolvers
    getPublications: (_, { username }) => getPublications(username),
    getFollowedPublications: (_, {}, ctx) => getFollowedPublications(ctx),

    // Comment resolvers
    getComments: (_, { publicationId }) => getComments(publicationId),

    // Like resolvers
    hasLiked: (_, { publicationId }, ctx) => hasLiked(publicationId, ctx),
    likeCount: (_, { publicationId }) => likeCount(publicationId),
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

    // Publications
    publish: (_, { file }, ctx) => publish(file, ctx),

    // Comments
    addComment: (_, { input }, ctx) => addComment(input, ctx),

    // Like
    doLike: (_, { publicationId }, ctx) => doLike(publicationId, ctx),
    removeLike: (_, { publicationId }, ctx) => removeLike(publicationId, ctx),
  },
};

module.exports = resolvers;
