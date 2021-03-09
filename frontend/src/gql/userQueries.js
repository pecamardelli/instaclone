import { gql } from "@apollo/client";

/**
 * ### DEFAULT FIELDS ###
 */

const userDefaultFields = `
  _id
  name
  username
  email
  website
  avatar
  description
  createdAt
`;

const userUpdateAvatarDefaultFields = `
  recordId
  record {
    avatar
  }
`;

const deleteAvatarDefaultFields = `
  deleteAvatar
`;

/**
 * ###  QUERY DEFINITIONS ###
 */

export const getUserOneQuery = (customFields) => {
  const fields = customFields || userDefaultFields;
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

export const getUserManyQuery = (customFields) => {
  const fields = customFields || userDefaultFields;
  return gql`
    query UserMany(
      $filter: FilterFindManyUserInput
      $skip: Int
      $limit: Int = 100
      $sort: SortFindManyUserInput
    ) {
      userMany(filter: $filter, skip: $skip, limit: $limit, sort: $sort) {
        ${fields}
      }
    }
  `;
};

// There's no need to pass a filter argument to this query since the backend
// will take the userId from the context and use it as the filter.
// All filter arguments will be overwritten.
export const getUserManyNotFollowedQuery = (customFields) => {
  const fields = customFields || userDefaultFields;
  return gql`
    query userManyNotFollowed(
      $filter: FilterFindManyUserInput
      $skip: Int
      $limit: Int = 100
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

export const deleteAvatarMutation = (customFields) => {
  const fields = customFields || deleteAvatarDefaultFields;
  return gql`
    mutation deleteAvatar {
      ${fields}
    }
  `;
};

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

export const updateUserMutation = (customFields) => {
  const fields = customFields || userDefaultFields;
  return gql`
    mutation UpdateUser($input: UpdateUserInput) {
      updateUser(input: $input) {
        ${fields}
      }
    }
  `;
};
