import React from "react";

import "./SearchResult.scss";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import NoAvatar from "../../../assets/images/avatar.png";

const avatarUrl = process.env.REACT_APP_AVATAR_URL;

export default function SearchResult({ data }) {
  const { title, username, avatar } = data;

  return (
    <Link to={username} className="search-results__item">
      <Image src={avatar ? `${avatarUrl}/${avatar}` : NoAvatar} />
      <div>
        <p>{title}</p>
        <p>{username}</p>
      </div>
    </Link>
  );
}
