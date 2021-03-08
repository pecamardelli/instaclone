import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery } from "@apollo/client";
import { Icon } from "semantic-ui-react";
import {
  getLikeCreateOneMutation,
  getLikeOneQuery,
  getLikeCountQuery,
  getLikeRemoveOneMutation,
} from "../../../gql/likeQueries";
import { toast } from "react-toastify";
import Error from "../Error/Error";

import "./CommentActions.scss";

export default function CommentActions(props) {
  const { publication } = props;
  const { auth } = useAuth();
  const [executing, setExecuting] = useState(false);
  const [likeCreateOne] = useMutation(getLikeCreateOneMutation());
  const [likeRemoveOne] = useMutation(getLikeRemoveOneMutation());

  const likeRecord = {
    userId: auth.id,
    publicationId: publication._id,
  };

  const hasLikedResult = useQuery(getLikeOneQuery(), {
    variables: { filter: likeRecord },
  });
  const likeCountResult = useQuery(getLikeCountQuery(), {
    variables: { filter: { publicationId: publication._id } },
  });

  if (hasLikedResult.error) return <Error error={hasLikedResult.error} />;
  if (likeCountResult.error) return <Error error={likeCountResult.error} />;

  const handleDoLike = async () => {
    setExecuting(true);
    try {
      await likeCreateOne({ variables: { record: likeRecord } });
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
      await likeRemoveOne({ variables: { filter: likeRecord } });
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
        className={hasLikedResult.data?.likeOne ? "like active" : "like"}
        name={hasLikedResult.data?.likeOne ? "heart" : "heart outline"}
        onClick={() =>
          handleClick(
            hasLikedResult.data?.likeOne ? handleRemoveLike : handleDoLike
          )
        }
      />
      <p>
        {likeCountResult.data?.likeCount ? likeCountResult.data.likeCount : 0}{" "}
        like
        {likeCountResult.data?.likeCount === 1 ? "" : "s"}
      </p>
    </div>
  );
}
