const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolvers");
const jwt = require("jsonwebtoken");
const express = require("express");

require("dotenv").config({ path: ".env" });

// Creating this app only to serve static files
const app = express();
app.use("/", express.static(__dirname + "/public"));

mongoose.connect(
  process.env.MONGO_DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.log("Error connecting database: " + err.message);
    else server();
  }
);

function server() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization;

      if (token) {
        try {
          const user = jwt.verify(
            token.replace("Bearer ", ""),
            process.env.JWT_PRIVATE_KEY
          );

          return { user };
        } catch (error) {
          console.error(`AUTHENTICATION ERROR: ${error.message}`);
          return null;
        }
      }
    },
  });

  apolloServer.listen().then((response) => {
    console.log(`Server listening on ${response.url}`);
  });

  // Couldn't find a way to serve static files with Apollo-server...
  app.listen(3010);
}
