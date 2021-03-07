import React, { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
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
  const authContext = useContext(AuthContext);
  const { publication } = props;
  const [executing, setExecuting] = useState(false);
  const [likeCreateOne] = useMutation(getLikeCreateOneMutation());
  const [likeRemoveOne] = useMutation(getLikeRemoveOneMutation());

  const likeRecord = {
    userId: authContext.auth.id,
    publicationId: publication._id,
  };
  console.dir(likeRecord);
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
