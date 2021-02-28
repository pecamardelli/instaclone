import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation AddComment($input: CommentInput) {
    addComment(input: $input) {
      publicationId
      text
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($publicationId: ID!) {
    getComments(publicationId: $publicationId) {
      publicationId
      userId {
        username
        id
        avatar
      }
      text
      createdAt
    }
  }
`;
