const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
    email: String
    website: String
    avatar: String
    description: String
    createdAt: String
  }
  type Token {
    token: String
  }
  type UpdateAvatar {
    status: Boolean
    avatarUrl: String
  }
  type Publish {
    status: Boolean
    fileUrl: String
  }
  type Publication {
    id: ID
    userId: User
    fileUrl: String
    fileType: String
    createdAt: String
  }
  type Comment {
    publicationId: ID
    userId: User
    text: String
    createdAt: String
  }
  type Like {
    id: ID
    publicationId: ID
    userId: ID
  }

  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input UpdateUserInput {
    username: String
    email: String
    website: String
    currentPassword: String
    newPassword: String
    description: String
  }
  input CommentInput {
    publicationId: ID
    text: String
  }

  type Query {
    # User
    getUser(id: ID, username: String): User
    search(keyword: String): [User]

    # Follower system queries
    isFollowing(username: String!): Boolean
    getFollowers(username: String!): [User]
    getFolloweds(username: String!): [User]

    # Publication queries
    getPublications(username: String!): [Publication]
    getFollowedPublications: [Publication]

    # Comment queries
    getComments(publicationId: ID!): [Comment]

    # Like queries
    hasLiked(publicationId: ID!): Boolean
    likeCount(publicationId: ID!): Int
  }

  type Mutation {
    #User system mutations
    registerUser(input: UserInput): User
    loginUser(input: LoginInput): Token
    updateAvatar(file: Upload): UpdateAvatar
    deleteAvatar: Boolean
    updateUser(input: UpdateUserInput): User

    #Follower system mutations
    followUser(username: String!): Boolean
    unfollowUser(username: String!): Boolean

    #Publication system mutations
    publish(file: Upload!): Publish

    #Comment system mutations
    addComment(input: CommentInput): Comment

    #Like system mutations
    doLike(publicationId: ID!): Like
    removeLike(publicationId: ID!): Boolean
  }
`;

module.exports = typeDefs;
