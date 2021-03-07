require("dotenv").config({ path: ".env" });

const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const schema = require("./gql/schema");
const jwt = require("jsonwebtoken");
const express = require("express");
const {
  mongodb,
  jwt: jwtCfg,
  restApi,
  fileUploads,
} = require("./config/config");

mongoose.connect(
  mongodb.uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.log("Error connecting to database: " + err.message);
    else server();
  }
);

function server() {
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization;
      return jwt.decode(token.replace("Bearer ", ""));
      // if (token) {
      //   try {
      //     const user = jwt.verify(
      //       token.replace("Bearer ", ""),
      //       jwtCfg.privateKey
      //     );

      //     return { user };
      //   } catch (error) {
      //     console.error(`AUTHENTICATION ERROR: ${error.message}`);
      //     return null;
      //   }
      // }
    },
  });

  apolloServer
    .listen()
    .then((response) => {
      console.log(`Apollo Server listening on ${response.url}`);
    })
    .catch((err) => {
      console.error(`Apollo Server error: ${err.message}`);
    });

  if (restApi.serveStaticFiles) {
    // Creating this app only to serve static files
    const app = express();
    app.use(
      "/",
      express.static(
        `${__dirname}/${fileUploads.directories.publicDir || "public"}`
      )
    );
    // Couldn't find a way to serve static files with Apollo-server...
    app
      .listen(restApi.serverPort || 3010, () => {
        console.log(`REST Api listening on port ${restApi.serverPort}`);
      })
      .on("error", (e) => {
        console.error(`REST Api error: ${e.message}`);
      });
  }
}
