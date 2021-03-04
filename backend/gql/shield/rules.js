const { rule } = require("graphql-shield");

const isLoggedIn = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    console.dir({ parent, args, ctx, info });
    return true;
  }
);

module.exports = {
  isLoggedIn,
};
