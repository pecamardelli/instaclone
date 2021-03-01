import { gql } from "@apollo/client";

export const DO_LIKE = gql`
  mutation DoLike($publicationId: ID!) {
    doLike(publicationId: $publicationId) {
      id
      publicationId
      userId
    }
  }
`;

export const REMOVE_LIKE = gql`
  mutation RemoveLike($publicationId: ID!) {
    removeLike(publicationId: $publicationId)
  }
`;

export const HAS_LIKED = gql`
  query HasLiked($publicationId: ID!) {
    hasLiked(publicationId: $publicationId)
  }
`;

export const LIKE_COUNT = gql`
  query LikeCount($publicationId: ID!) {
    likeCount(publicationId: $publicationId)
  }
`;
