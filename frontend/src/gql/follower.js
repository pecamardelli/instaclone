import { gql } from "@apollo/client";

export const IS_FOLLOWING = gql`
  query IsFollowing($username: String!) {
    isFollowing(username: $username)
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($username: String!) {
    followUser(username: $username)
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($username: String!) {
    unfollowUser(username: $username)
  }
`;

export const GET_FOLLOWERS = gql`
  query GetFollowers($username: String!) {
    getFollowers(username: $username) {
      id
      name
      username
      email
      avatar
    }
  }
`;

export const GET_FOLLOWEDS = gql`
  query GetFolloweds($username: String!) {
    getFolloweds(username: $username) {
      id
      name
      username
      email
      avatar
    }
  }
`;
