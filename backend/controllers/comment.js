const CommentModel = require("../models/comment");
const { comments } = require("../config/config");

async function addComment(input, ctx) {
  const { publicationId, text } = input;
  const { user } = ctx;

  if (!publicationId) throw new Error("Publication ID is not defined.");
  if (!text) throw new Error("Comment text cannot be empty.");
  if (!user) throw new Error("No user provided in context.");

  let commentBody = text.toString();
  if (commentBody.length > comments.maxLength) {
    commentBody = commentBody.substring(0, comments.maxLength);
  }

  try {
    const newComment = new CommentModel({
      publicationId,
      userId: user.id,
      text: commentBody,
    });
    newComment.save();
    return newComment;
  } catch (error) {
    console.error(`Could not add comment: ${error.message || error.text}`);
    return null;
  }
}

async function getComments(publicationId) {
  if (!publicationId) throw new Error("No publication ID was provided.");

  try {
    const result = await CommentModel.find()
      .where({ publicationId })
      .populate("userId");

    return result;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  addComment,
  getComments,
};
