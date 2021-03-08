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
  _id
  userId
  user {
    name
    username
    avatar
  }
  fileName
  fileExtension
  createdAt
`;

export const getPublicationManyQuery = (customFields) => {
  const fields = customFields || publicationDefaultFields;
  return gql`
    query PublicationMany(
      $filter: FilterFindManyPublicationInput
      $skip: Int
      $limit: Int = 100
      $sort: SortFindManyPublicationInput
    ) {
      publicationMany(filter: $filter, skip: $skip, limit: $limit, sort: $sort) {
        ${fields}
      }
    }
  `;
};

export const getPublicationManyByUsername = (customFields) => {
  const fields = customFields || publicationDefaultFields;
  return gql`
    query publicationManyByUsername($filter: PublicationManyByUsernameInput) {
      publicationManyByUsername(filter: $filter) {
        ${fields}
      }
    }
  `;
};

export const getPublicationManyOfFollowedsQuery = (customFields) => {
  const fields = customFields || publicationDefaultFields;
  return gql`
    query PublicationManyOfFolloweds(
      $filter: FilterFindManyPublicationInput
      $skip: Int
      $limit: Int = 100
      $sort: SortFindManyPublicationInput
    ) {
      publicationManyOfFolloweds(
        filter: $filter
        skip: $skip
        limit: $limit
        sort: $sort
      ) {
        ${fields}
      }
    }
  `;
};
