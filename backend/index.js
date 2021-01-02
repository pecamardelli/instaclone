const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolvers");

require("dotenv").config({ path: ".env"});

mongoose.connect(process.env.DB_CON, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}, (err) => {
    if (err) console.log("Error connecting database: " + err.message);
    else server();
});

function server() {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    apolloServer.listen().then((response) => {
        console.log(`Server listening on ${response.url}`);
    });
}