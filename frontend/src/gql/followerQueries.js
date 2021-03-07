import { gql } from "@apollo/client";

export const isFollowingQuery = () => {
  return gql`
    query IsFollowing($username: String!) {
      isFollowing(username: $username)
    }
  `;
};

export const followUserMutation = () => {
  return gql`
    mutation FollowUser($username: String!) {
      followUser(username: $username)
    }
  `;
};

export const unfollowUserMutation = () => {
  return gql`
    mutation UnfollowUser($username: String!) {
      unfollowUser(username: $username)
    }
  `;
};

const getFollowersDefaultFields = `
i d
  name
  username
  email
  avatar
`;

export const getFollowersQuery = (customFields) => {
  const fields = customFields || getFollowersDefaultFields;
  return gql`
    query GetFollowers($username: String!) {
      getFollowers(username: $username) {
        ${fields}
      }
    }
  `;
};

const getFollowedsDefaultFields = `
  id
  name
  username
  email
  avatar
`;

export const getFollowedsQuery = (customFields) => {
  const fields = customFields || getFollowedsDefaultFields;
  return gql`
    query GetFolloweds($username: String!) {
      getFolloweds(username: $username) {
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
