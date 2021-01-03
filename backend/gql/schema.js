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

    type Query {
        # User
        getUser: User
    }

    type Mutation {
        #User
        registerUser(input: UserInput): User
        loginUser(input: LoginInput): Token
    }
`;

module.exports = typeDefs;