import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { getCommentManyQuery } from "../../../gql/commentQueries";
import { Image } from "semantic-ui-react";
import { urls } from "../../../config/config";
import Error from "../Error/Error";

import "./CommentList.scss";

export default function CommentList(props) {
  const { publication } = props;

  const { data, loading, error } = useQuery(getCommentManyQuery(), {
    variables: { filter: { publicationId: publication._id } },
  });

  if (loading) return null;
  if (error) return <Error error={error} />;

  const commentList = data.commentMany || [];

  return (
    <div className="comment-list">
      {commentList.map((c, index) => (
        <div key={index} className="comment">
          <Link to={`/${c.user.username}`}>
            <Image src={`${urls.userAvatarPath}/${c.user.avatar}`} avatar />
          </Link>
          <div>
            <p>{c.user.username}</p>
            <p>{c.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
