import { gql } from "@apollo/client";

export const PUBLISH = gql`
  mutation Publish($file: Upload!) {
    publish(file: $file) {
      status
      fileUrl
    }
  }
`;

const publicationDefaultFields = `
  id
  userId {
    name
    username
    avatar
  }
  fileUrl
  fileType
  createdAt
`;

export const GET_PUBLICATIONS = gql`
  query GetPublications($username: String!) {
    getPublications(username: $username) {
      ${publicationDefaultFields}
    }
  }
`;

export const GET_FOLLOWED_PUBLICATIONS = gql`
  query GetFollowedPublications {
    getFollowedPublications {
      ${publicationDefaultFields}
    }
  }
`;
