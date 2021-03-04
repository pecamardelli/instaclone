import { gql } from "@apollo/client";

const doLikeDefaultFields = `
  id
  publicationId
  userId
`;

export const doLikeMutation = (customFields) => {
  const fields = customFields || doLikeDefaultFields;
  return gql`
    mutation DoLike($publicationId: ID!) {
      doLike(publicationId: $publicationId) {
        ${fields}
      }
    }
  `;
};

export const removeLikeMutation = () => {
  return gql`
    mutation RemoveLike($publicationId: ID!) {
      removeLike(publicationId: $publicationId)
    }
  `;
};

export const hasLikedQuery = () => {
  return gql`
    query HasLiked($publicationId: ID!) {
      hasLiked(publicationId: $publicationId)
    }
  `;
};

export const likeCountQuery = () => {
  return gql`
    query LikeCount($publicationId: ID!) {
      likeCount(publicationId: $publicationId)
    }
  `;
};
