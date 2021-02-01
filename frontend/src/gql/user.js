import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation registerUser($input: UserInput) {
    registerUser(input: $input) {
      name
      username
      email
      password
    }
  }
`;

export const LOGIN = gql`
  mutation loginUser($input: LoginInput) {
    loginUser(input: $input) {
      token
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID, $username: String) {
    getUser(id: $id, username: $username) {
      id
      name
      username
      email
      website
      avatar
      description
      createdAt
    }
  }
`;

export const UPDATE_AVATAR = gql`
  mutation updateAvatar($file: Upload) {
    updateAvatar(file: $file) {
      status
      avatarUrl
    }
  }
`;

export const DELETE_AVATAR = gql`
  mutation deleteAvatar {
    deleteAvatar
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput) {
    updateUser(input: $input) {
      id
      name
      username
      email
      description
      website
    }
  }
`;
