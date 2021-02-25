import React, { useContext, useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import "./UserMenu.scss";
import noAvatar from "../../../assets/images/avatar.png";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import AuthContext from "./../../../context/AuthContext";
import PostModal from "../../Modal/PostModal/PostModal";
import configurations from "../../../config/config";

export default function UserMenu() {
  const [showPostModal, setShowPostModal] = useState(false);
  const { auth } = useAuth();
  const authContext = useContext(AuthContext);
  const { urls } = configurations;

  const handleShowPostModal = () => {
    setShowPostModal(true);
  };

  return (
    <>
      <div className="user-menu">
        <Link to="/">
          <Icon name="home" />
        </Link>
        <Icon name="plus" onClick={handleShowPostModal} />
        <Link to={`/${auth.username}`}>
          <Image
            src={
              authContext.auth.avatar
                ? `${urls.userAvatarPath}/${authContext.auth.avatar}`
                : noAvatar
            }
            avatar
          />
        </Link>
      </div>
      <PostModal show={showPostModal} setShow={setShowPostModal} />
    </>
  );
}
