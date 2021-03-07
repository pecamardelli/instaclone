import { gql } from "@apollo/client";

const likeCreateOneDefaultFields = `
  _id
  publicationId
  userId
`;

export const getLikeCreateOneMutation = (customFields) => {
  const fields = customFields || likeCreateOneDefaultFields;
  return gql`
    mutation likeCreateOne($record: CreateOneLikeInput!) {
      likeCreateOne(record: $record) {
        recordId
        record {
          ${fields}
        }
      }
    }
  `;
};

export const getLikeRemoveOneMutation = () => {
  return gql`
    mutation LikeRemoveOne(
      $filter: FilterRemoveOneLikeInput
      $sort: SortRemoveOneLikeInput
    ) {
      likeRemoveOne(filter: $filter, sort: $sort) {
        recordId
      }
    }
  `;
};

const likeOneDefaultFields = `
  _id
`;

export const getLikeOneQuery = (customFields) => {
  const fields = customFields || likeOneDefaultFields;
  return gql`
    query LikeOne(
      $filter: FilterFindOneLikeInput
      $skip: Int
      $sort: SortFindOneLikeInput
    ) {
      likeOne(filter: $filter, skip: $skip, sort: $sort) {
        ${fields}
      }
    }
  `;
};

export const getLikeCountQuery = () => {
  return gql`
    query LikeCount($filter: FilterCountLikeInput) {
      likeCount(filter: $filter)
    }
  `;
};
