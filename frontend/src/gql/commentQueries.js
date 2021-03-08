import { gql } from "@apollo/client";

/**
 * ### DEFAULT FIELDS ###
 */

const commentCreateOneDefaultFields = `
  recordId
  record {
    text
  }
`;

const getCommentsDefaultFields = `
  _id
  userId
  user {
    _id
    username
    avatar
  }
  text
  createdAt
`;

/**
 * ### QUERY DEFINITIONS ###
 */

export const getCommentManyQuery = (customFields) => {
  const fields = customFields || getCommentsDefaultFields;
  return gql`
    query CommentMany(
      $filter: FilterFindManyCommentInput
      $skip: Int
      $limit: Int = 100
      $sort: SortFindManyCommentInput
    ) {
      commentMany(filter: $filter, skip: $skip, limit: $limit, sort: $sort) {
        ${fields}
      }
    }
  `;
};

/**
 * ### MUTATION DEFINITIONS ###
 */

export const getCommentCreateOneMutation = (customFields) => {
  const fields = customFields || commentCreateOneDefaultFields;
  return gql`
    mutation CommentCreateOne($record: CreateOneCommentInput!) {
      commentCreateOne(record: $record) {
        ${fields}
      }
    }
  `;
};
