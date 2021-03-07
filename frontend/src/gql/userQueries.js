import { gql } from "@apollo/client";

export const getRegisterUserMutation = () => {
  return gql`
    mutation userRegister($record: UserRegisterInput) {
      userRegister(record: $record) {
        token
      }
    }
  `;
};

export const getLoginMutation = () => {
  return gql`
    mutation userLogin($record: UserLoginInput) {
      userLogin(record: $record) {
        token
      }
    }
  `;
};

const getUserDefaultFields = `
  id
  name
  username
  email
  website
  avatar
  description
  createdAt
`;

export const getUserQuery = (customFields) => {
  const fields = customFields || getUserDefaultFields;
  return gql`
    query GetUser($id: ID, $username: String) {
      getUser(id: $id, username: $username) {
        ${fields}
      }
    }
  `;
};

const updateAvatarDefaultFields = `
  status
  avatarUrl
`;

export const updateAvatarMutation = (customFields) => {
  const fields = customFields || updateAvatarDefaultFields;
  return gql`
    mutation updateAvatar($file: Upload) {
      updateAvatar(file: $file) {
        ${fields}
      }
    }
  `;
};

const deleteAvatarDefaultFields = `
  deleteAvatar
`;

export const deleteAvatarMutation = (customFields) => {
  const fields = customFields || deleteAvatarDefaultFields;
  return gql`
    mutation deleteAvatar {
      ${fields}
    }
  `;
};

const updateUserDefaultFields = `
  id
  name
  username
  email
  description
  website
`;

export const updateUserMutation = (customFields) => {
  const fields = customFields || updateUserDefaultFields;
  return gql`
    mutation UpdateUser($input: UpdateUserInput) {
      updateUser(input: $input) {
        ${fields}
      }
    }
  `;
};

const searchUsersDefaultFields = `
  id
  name
  username
  email
  website
  description
  avatar
`;

export const searchUsersQuery = (customFields) => {
  const fields = customFields || searchUsersDefaultFields;
  return gql`
    query Search($keyword: String) {
      search(keyword: $keyword) {
        ${fields}
      }
    }
  `;
};
