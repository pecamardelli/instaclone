import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_COMMENTS } from "../../../gql/comment";
import { Image } from "semantic-ui-react";
import { urls } from "../../../config/config";

import "./CommentList.scss";

export default function CommentList(props) {
  const { publication } = props;

  const { data, loading, error } = useQuery(GET_COMMENTS, {
    variables: { publicationId: publication.id },
  });

  if (loading) return null;
  if (error) return <h3>{error.message}</h3>;

  const commentList = data.getComments || [];

  return (
    <div className="comment-list">
      {commentList.map((c, index) => (
        <div key={index} className="comment">
          <Link to={`/${c.userId.username}`}>
            <Image src={`${urls.userAvatarPath}/${c.userId.avatar}`} avatar />
          </Link>
          <div>
            <p>{c.userId.username}</p>
            <p>{c.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
