const { applyMiddleware } = require("graphql-middleware");
const { shield, and, allow, or } = require("graphql-shield");
const {
  isLoggedIn,
  isAdmin,
  isDocumentOwner,
  isSiteOwner,
} = require("./ruleBundle");

/**
 * ### ATTENTION ###
 * It's not the best practice to rely on a database field in order to determine
 * the user role. Maybe it will be better to use another service for authentication
 * and user privileges, like Firebase.
 * We will rely on database for simplicity.
 * #################
 */

const permissions = shield(
  {
    Query: {
      "*": and(isLoggedIn),
    },
    Mutation: {
      "*": and(isLoggedIn),
      // COMMENT SECTION
      commentUpdateById: and(isDocumentOwner),
      commentUpdateOne: or(isAdmin, isSiteOwner),
      commentUpdateMany: or(isAdmin, isSiteOwner),
      commentRemoveById: or(isAdmin, isSiteOwner),
      commentRemoveOne: or(isAdmin, isSiteOwner),
      commentRemoveMany: or(isAdmin, isSiteOwner),
      // FOLLOWER SECTION
      followerUpdateById: and(isDocumentOwner),
      followerUpdateOne: or(isAdmin, isSiteOwner),
      followerUpdateMany: or(isAdmin, isSiteOwner),
      followerRemoveById: or(isAdmin, isSiteOwner),
      followerRemoveOne: or(isAdmin, isSiteOwner),
      followerRemoveMany: or(isAdmin, isSiteOwner),
      // LIKE SECTION
      likeUpdateById: and(isDocumentOwner),
      likeUpdateOne: or(isAdmin, isSiteOwner),
      likeUpdateMany: or(isAdmin, isSiteOwner),
      likeRemoveById: or(isDocumentOwner, isAdmin, isSiteOwner),
      likeRemoveOne: or(isAdmin, isSiteOwner),
      likeRemoveMany: or(isAdmin, isSiteOwner),
      // PUBLICATION SECTION
      publicationCreateMany: or(isAdmin, isSiteOwner),
      publicationUpdateById: and(isDocumentOwner),
      publicationUpdateOne: or(isDocumentOwner, isAdmin, isSiteOwner),
      publicationUpdateMany: or(isAdmin, isSiteOwner),
      publicationRemoveById: or(isDocumentOwner, isAdmin, isSiteOwner),
      publicationRemoveOne: or(isAdmin, isSiteOwner),
      publicationRemoveMany: or(isAdmin, isSiteOwner),
      // USER SECTION
      userLogin: allow,
      userRegister: allow,
      userUpdateById: and(isDocumentOwner),
      userUpdateOne: or(isAdmin, isSiteOwner),
      userUpdateMany: or(isAdmin, isSiteOwner),
      userUpdateAvatar: and(isDocumentOwner),
      userRemoveById: or(isAdmin, isSiteOwner),
      userRemoveOne: or(isAdmin, isSiteOwner),
      userRemoveMany: or(isAdmin, isSiteOwner),
    },
  },
  {
    debug: true,
    allowExternalErrors: true,
  }
);

const shieldSchema = (schema) => applyMiddleware(schema, permissions);
module.exports = shieldSchema;
