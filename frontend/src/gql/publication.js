import { gql } from "@apollo/client";

const publishDefaultFields = `
  status
  fileUrl
`;

export const publishMutation = (customFields) => {
  const fields = customFields || publishDefaultFields;
  return gql`
    mutation Publish($file: Upload!) {
      publish(file: $file) {
        ${fields}
      }
    }
  `;
};

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

export const getPublicationsQuery = (customFields) => {
  const fields = customFields || publicationDefaultFields;
  return gql`
    query GetPublications($username: String!) {
      getPublications(username: $username) {
        ${fields}
      }
    }
  `;
};

export const getFollowedPublicationsQuery = (customFields) => {
  const fields = customFields || publicationDefaultFields;
  return gql`
    query GetFollowedPublications {
      getFollowedPublications {
        ${fields}
      }
    }
  `;
};
