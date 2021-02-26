const CommentModel = require("../models/comment");

async function addComment(input, ctx) {
  const { publicationId, text } = input;
  const { user } = ctx;

  if (!publicationId) throw new Error("Publication ID is not defined.");
  if (!text) throw new Error("Comment text cannot be empty.");
  if (!user) throw new Error("No user provided in context.");

  try {
    const newComment = new CommentModel({
      publicationId,
      userId: user.id,
      text,
    });
    newComment.save();
    return newComment;
  } catch (error) {
    console.error(`Could not add comment: ${error.message || error.text}`);
    return null;
  }
}

module.exports = {
  addComment,
};
