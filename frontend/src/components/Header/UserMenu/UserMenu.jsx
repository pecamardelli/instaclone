import React, { useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import noAvatar from "../../../assets/images/noAvatar.png";
import useAuth from "../../../hooks/useAuth";
import PostModal from "../../Modal/PostModal/PostModal";
import { urls } from "../../../config/config";

import "./UserMenu.scss";

export default function UserMenu() {
  const [showPostModal, setShowPostModal] = useState(false);
  const { auth } = useAuth();

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
              auth.avatar ? `${urls.userAvatarPath}/${auth.avatar}` : noAvatar
            }
            avatar
          />
        </Link>
      </div>
      <PostModal show={showPostModal} setShow={setShowPostModal} />
    </>
  );
}
