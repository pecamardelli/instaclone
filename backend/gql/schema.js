const { schemaComposer } = require("graphql-compose");
const CommentTC = require("./compose/CommentTC");
const FollowerTC = require("./compose/FollowerTC");
const LikeTC = require("./compose/LikeTC");
const PublicationTC = require("./compose/PublicationTC");
const UserTC = require("./compose/UserTC");
const shieldSchema = require("./shield/shieldSchema");
const { GraphQLUpload } = require("apollo-server");

// Adding the Upload type to schemaComposer. This is necessary for
// the file upload functionality.
schemaComposer.add(GraphQLUpload);

schemaComposer.Query.addFields({
  ...CommentTC.queries,
  ...FollowerTC.queries,
  ...LikeTC.queries,
  ...PublicationTC.queries,
  ...UserTC.queries,
});

schemaComposer.Mutation.addFields({
  ...CommentTC.mutations,
  ...FollowerTC.mutations,
  ...LikeTC.mutations,
  ...PublicationTC.mutations,
  ...UserTC.mutations,
});

/**
 * RELATIONS SECTION
 */

PublicationTC.TC.addRelation("user", {
  resolver: () => UserTC.TC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source["userId"],
  },
  projection: { userId: true },
});

FollowerTC.TC.addRelation("user", {
  resolver: () => UserTC.TC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source["userId"],
  },
  projection: { userId: true },
});

FollowerTC.TC.addRelation("follower", {
  resolver: () => UserTC.TC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source["followId"],
  },
  projection: { followId: true },
});

CommentTC.TC.addRelation("user", {
  resolver: () => UserTC.TC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source["userId"],
  },
  projection: { userId: true },
});

CommentTC.TC.addRelation("publication", {
  resolver: () => PublicationTC.TC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source["publicationId"],
  },
  projection: { publicationId: true },
});

LikeTC.TC.addRelation("user", {
  resolver: () => UserTC.TC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source["userId"],
  },
  projection: { userId: true },
});

LikeTC.TC.addRelation("publication", {
  resolver: () => PublicationTC.TC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source["publicationId"],
  },
  projection: { publicationId: true },
});

/**
 * END OF RELATIONS SECTION
 */

const graphqlSchema = schemaComposer.buildSchema();

// Apply shield rules to queries and mutations.
const shieldedSchema = shieldSchema(graphqlSchema);

module.exports = shieldedSchema;
