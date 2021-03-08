import { gql } from "@apollo/client";

const commentCreateOneDefaultFields = `
  recordId
  record {
    text
  }
`;

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
