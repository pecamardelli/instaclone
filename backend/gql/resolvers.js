const { registerUser } = require("../controllers/user");

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
        registerUser: async (_, { input }) => registerUser(input)
    }
};

module.exports = resolvers;