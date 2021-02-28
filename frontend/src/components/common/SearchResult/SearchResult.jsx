import React from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import NoAvatar from "../../../assets/images/avatar.png";
import { urls } from "../../../config/config";

import "./SearchResult.scss";

export default function SearchResult({ data }) {
  const { title, username, avatar } = data;

  return (
    <Link to={username} className="search-results__item">
      <Image src={avatar ? `${urls.userAvatarPath}/${avatar}` : NoAvatar} />
      <div>
        <p>{title}</p>
        <p>{username}</p>
      </div>
    </Link>
  );
}
