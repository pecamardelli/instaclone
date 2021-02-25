import { gql } from "@apollo/client";

export const PUBLISH = gql`
  mutation Publish($file: Upload) {
    publish(file: $file) {
      status
      fileUrl
    }
  }
`;

export const GET_PUBLICATIONS = gql`
  query GetPublications($username: String!) {
    getPublications(username: $username) {
      id
      userId
      fileUrl
      fileType
      createdAt
    }
  }
`;
