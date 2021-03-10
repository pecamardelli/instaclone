const isLoggedIn = require("./rules/isLoggedIn");
const isAdmin = require("./rules/isAdmin");
const isDocumentOwner = require("./rules/isDocumentOwner");
const isSiteOwner = require("./rules/isSiteOwner");

module.exports = {
  isLoggedIn,
  isAdmin,
  isDocumentOwner,
  isSiteOwner,
};
