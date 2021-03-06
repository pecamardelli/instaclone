const { comments } = require("../../../config/config");

const commentCreateOneWrapper = (next) => async (rp) => {
  const { record } = rp.args;
  const { context } = rp;

  if (!record.publicationId) throw new Error("Publication ID is not defined.");
  if (!record.text) throw new Error("Comment text cannot be empty.");
  if (!context.user.id) throw new Error("No user provided in context.");
  if (context.user.id !== record.userId) throw new Error("Illegal operation!");

  // Replace the publication's userId for the one in the context.
  record.userId = context.user.id;

  let commentBody = record.text.toString();
  if (commentBody.length > comments.maxLength) {
    commentBody = commentBody.substring(0, comments.maxLength);
  }

  return next(rp);
};

module.exports = {
  commentCreateOneWrapper,
};
