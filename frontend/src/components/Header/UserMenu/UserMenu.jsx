import React, { useContext } from "react";
import { Icon, Image } from "semantic-ui-react";
import "./UserMenu.scss";
import noAvatar from "../../../assets/images/avatar.png";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import AuthContext from "./../../../context/AuthContext";

const avatarUrl = process.env.REACT_APP_AVATAR_URL;

export default function UserMenu() {
  const { auth } = useAuth();
  const authContext = useContext(AuthContext);

  return (
    <div className='user-menu'>
      <Link to='/'>
        <Icon name='home' />
      </Link>
      <Icon name='plus' />
      <Link to={`/${auth.username}`}>
        <Image
          src={
            authContext.auth.avatar
              ? `${avatarUrl}/${authContext.auth.avatar}`
              : noAvatar
          }
          avatar
        />
      </Link>
    </div>
  );
}
