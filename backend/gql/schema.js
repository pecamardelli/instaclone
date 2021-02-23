const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
    password: String
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
  type Follower {
    id: ID
    name: String
    username: String
    email: String
    website: String
    avatar: String
    description: String
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

  type Query {
    # User
    getUser(id: ID, username: String): User
    search(keyword: String): [User]

    # Follower system queries
    isFollowing(username: String!): Boolean
    getFollowers(username: String!): [Follower]
    getFolloweds(username: String!): [Follower]
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
  }
`;

module.exports = typeDefs;
