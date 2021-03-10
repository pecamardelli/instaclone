const isLoggedIn = require("./rules/isLoggedIn");
const isAdmin = require("./rules/isAdmin");
const isDocumentOwner = require("./rules/isDocumentOwner");

module.exports = {
  isLoggedIn,
  isAdmin,
  isDocumentOwner,
};
