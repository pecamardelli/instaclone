import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Icon } from "semantic-ui-react";
import { DO_LIKE, HAS_LIKED, LIKE_COUNT, REMOVE_LIKE } from "../../../gql/like";
import { toast } from "react-toastify";
import "./CommentActions.scss";

export default function CommentActions(props) {
  const { publication } = props;
  const [executing, setExecuting] = useState(false);
  const [doLike] = useMutation(DO_LIKE);
  const [removeLike] = useMutation(REMOVE_LIKE);

  const variables = { publicationId: publication.id };

  const hasLikedQuery = useQuery(HAS_LIKED, { variables });
  const likeCountQuery = useQuery(LIKE_COUNT, { variables });

  const handleDoLike = async () => {
    setExecuting(true);
    try {
      await doLike({ variables });
      hasLikedQuery.refetch();
      likeCountQuery.refetch();
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
      hasLikedQuery.refetch();
      likeCountQuery.refetch();
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
        className={hasLikedQuery.data?.hasLiked ? "like active" : "like"}
        name={hasLikedQuery.data?.hasLiked ? "heart" : "heart outline"}
        onClick={() =>
          handleClick(
            hasLikedQuery.data?.hasLiked ? handleRemoveLike : handleDoLike
          )
        }
      />
      <p>
        {likeCountQuery.data?.likeCount ? likeCountQuery.data?.likeCount : 0}{" "}
        like
        {likeCountQuery.data?.likeCount === 1 ? "" : "s"}
      </p>
    </div>
  );
}
