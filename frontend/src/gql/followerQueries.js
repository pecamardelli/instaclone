import { gql } from "@apollo/client";

/**
 * ### DEFAULT FIELDS ###
 */

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

const getNotFollowedsDefaultFields = `
  name
  username
  avatar
`;

/**
 * ###  QUERY DEFINITIONS ###
 */

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

export const getUserManyNotFollowedQuery = (customFields) => {
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

/**
 * ### MUTATION DEFINITIONS ###
 */

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
