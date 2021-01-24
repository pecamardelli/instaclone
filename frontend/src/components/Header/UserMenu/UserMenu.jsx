import React from "react";
import { Icon, Image } from "semantic-ui-react";
import "./UserMenu.scss";
import noAvatar from "../../../assets/images/avatar.png";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { GET_USER } from "../../../gql/user";
import { useQuery } from "@apollo/client";

export default function UserMenu() {
  const { auth } = useAuth();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username: auth.username },
  });

  const avatarUrl = "http://localhost:3010/images/avatars";

  if (loading) return null;
  if (error) return <h1>An error ocurred: {error}</h1>;

  const { getUser: userData } = data;

  return (
    <div className="user-menu">
      <Link to="/">
        <Icon name="home" />
      </Link>
      <Icon name="plus" />
      <Link to={`/${auth.username}`}>
        <Image
          src={userData.avatar ? `${avatarUrl}/${userData.avatar}` : noAvatar}
          avatar
        />
      </Link>
    </div>
  );
}
