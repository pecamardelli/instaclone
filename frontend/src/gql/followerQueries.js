import { gql } from "@apollo/client";

export const getFollowerOneQuery = () => {
  return gql`
    query FollowerOne(
      $filter: FilterFindOneFollowerInput
      $skip: Int
      $sort: SortFindOneFollowerInput
    ) {
      followerOne(filter: $filter, skip: $skip, sort: $sort) {
        _id
      }
    }
  `;
};

export const getFollowerCreateOneMutation = () => {
  return gql`
    mutation FollowerCreateOne($record: CreateOneFollowerInput!) {
      followerCreateOne(record: $record) {
        recordId
      }
    }
  `;
};

export const getFollowerRemoveOneMutation = () => {
  return gql`
    mutation FollowerRemoveOne(
      $filter: FilterRemoveOneFollowerInput
      $sort: SortRemoveOneFollowerInput
    ) {
      followerRemoveOne(filter: $filter, sort: $sort) {
        recordId
      }
    }
  `;
};

const followerDefaultFields = `
  userId
  user {
    name
    username
    avatar
  }
  followId
  follower {
    name
    username
    avatar
}
`;

export const getFollowerManyQuery = (customFields) => {
  const fields = customFields || followerDefaultFields;
  return gql`
    query FollowerMany(
      $filter: FilterFindManyFollowerInput
      $skip: Int
      $limit: Int = 100
      $sort: SortFindManyFollowerInput
    ) {
      followerMany(filter: $filter, skip: $skip, limit: $limit, sort: $sort) {
        ${fields}
      }
    }
  `;
};

const getNotFollowedsDefaultFields = `
  name
  username
  avatar
`;

export const getUserManyNotFollowed = (customFields) => {
  const fields = customFields || getNotFollowedsDefaultFields;
  return gql`
    query UserManyNotFollowed(
      $filter: FilterFindManyUserInput
      $skip: Int
      $limit: Int
      $sort: SortFindManyUserInput
    ) {
      userManyNotFollowed(
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
