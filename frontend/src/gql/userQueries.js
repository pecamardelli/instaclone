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

const userOneDefaultFields = `
  _id
  name
  username
  email
  website
  avatar
  description
  createdAt
`;

export const getUserOneQuery = (customFields) => {
  const fields = customFields || userOneDefaultFields;
  return gql`
    query UserOne(
      $filter: FilterFindOneUserInput
      $skip: Int
      $sort: SortFindOneUserInput
    ) {
      userOne(filter: $filter, skip: $skip, sort: $sort) {
        ${fields}
      }
    }
  `;
};

const userUpdateAvatarDefaultFields = `
  recordId
  record {
    avatar
  }
`;

export const getUserUpdateAvatarMutation = (customFields) => {
  const fields = customFields || userUpdateAvatarDefaultFields;
  return gql`
    mutation UserUpdateAvatar($file: Upload!) {
      userUpdateAvatar(file: $file) {
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
