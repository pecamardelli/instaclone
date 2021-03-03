import React from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import NoAvatar from "../../../assets/images/noAvatar.png";
import { urls } from "../../../config/config";

import "./UserCard.scss";

export default function UserCard({ data }) {
  const { title, username, avatar } = data;

  return (
    <Link to={username} className="user-card__item">
      <Image src={avatar ? `${urls.userAvatarPath}/${avatar}` : NoAvatar} />
      <div>
        <p>{title}</p>
        <p>{username}</p>
      </div>
    </Link>
  );
}
