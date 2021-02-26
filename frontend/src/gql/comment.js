import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation AddComment($input: CommentInput) {
    addComment(input: $input) {
      publicationId
      text
    }
  }
`;
