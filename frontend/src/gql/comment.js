import { gql } from "@apollo/client";

const addCommentDefaultFields = `
  publicationId
  text
`;

export const addCommentMutation = (customFields) => {
  const fields = customFields || addCommentDefaultFields;
  return gql`
    mutation AddComment($input: CommentInput) {
      addComment(input: $input) {
        ${fields}
      }
    }
  `;
};

const getCommentsDefaultFields = `
  publicationId
  userId {
    username
    id
    avatar
  }
  text
  createdAt
`;

export const getCommentsQuery = (customFields) => {
  const fields = customFields || getCommentsDefaultFields;
  return gql`
    query GetComments($publicationId: ID!) {
      getComments(publicationId: $publicationId) {
        ${fields}
      }
    }
`;
};
