import React from "react";
import { Icon, Image } from "semantic-ui-react";
import "./UserMenu.scss";
import noAvatar from "../../../assets/images/avatar.png";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function UserMenu() {
  const { auth } = useAuth();

  return (
    <div className="user-menu">
      <Link to="/">
        <Icon name="home" />
      </Link>
      <Icon name="plus" />
      <Link to={`/${auth.username}`}>
        <Image src={noAvatar} avatar />
      </Link>
    </div>
  );
}
