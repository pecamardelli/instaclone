const { registerUser, loginUser } = require("../controllers/user");

const resolvers = {
    Query: {
        // User
        getUser: () => {
            console.log("Getting user...");
            return null;
        }
    },
    Mutation: {
        // User
        registerUser: (_, { input }) => registerUser(input),
        loginUser: (_, { input }) => loginUser(input),
    }
};

module.exports = resolvers;