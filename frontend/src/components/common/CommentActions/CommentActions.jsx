import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Icon } from "semantic-ui-react";
import {
  doLikeMutation,
  hasLikedQuery,
  likeCountQuery,
  removeLikeMutation,
} from "../../../gql/like";
import { toast } from "react-toastify";
import Error from "../Error/Error";

import "./CommentActions.scss";

export default function CommentActions(props) {
  const { publication } = props;
  const [executing, setExecuting] = useState(false);
  const [doLike] = useMutation(doLikeMutation());
  const [removeLike] = useMutation(removeLikeMutation());

  const variables = { publicationId: publication.id };

  const hasLikedResult = useQuery(hasLikedQuery(), { variables });
  const likeCountResult = useQuery(likeCountQuery(), { variables });

  if (hasLikedResult.error) return <Error error={hasLikedResult.error} />;
  if (likeCountResult.error) return <Error error={likeCountResult.error} />;

  const handleDoLike = async () => {
    setExecuting(true);
    try {
      await doLike({ variables });
      hasLikedResult.refetch();
      likeCountResult.refetch();
    } catch (error) {
      toast.error(error.message || error.text);
    } finally {
      setExecuting(false);
    }
  };

  const handleRemoveLike = async () => {
    setExecuting(true);
    try {
      await removeLike({ variables });
      hasLikedResult.refetch();
      likeCountResult.refetch();
    } catch (error) {
      toast.error(error.message || error.text);
    } finally {
      setExecuting(false);
    }
  };

  const handleClick = (fn) => {
    if (executing) return;
    fn();
  };

  return (
    <div className="comment-actions">
      <Icon
        className={hasLikedResult.data?.hasLiked ? "like active" : "like"}
        name={hasLikedResult.data?.hasLiked ? "heart" : "heart outline"}
        onClick={() =>
          handleClick(
            hasLikedResult.data?.hasLiked ? handleRemoveLike : handleDoLike
          )
        }
      />
      <p>
        {likeCountResult.data?.likeCount ? likeCountResult.data?.likeCount : 0}{" "}
        like
        {likeCountResult.data?.likeCount === 1 ? "" : "s"}
      </p>
    </div>
  );
}
