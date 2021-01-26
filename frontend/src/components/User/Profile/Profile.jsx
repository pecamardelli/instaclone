import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import useAuth from "../../../hooks/useAuth";
import noAvatar from "../../../assets/images/avatar.png";
import UserNotFound from "../../UserNotFound/UserNotFound";
import BasicModal from "../../Modal/BasicModal";
import AvatarForm from "../AvatarForm/AvatarForm";
import AuthContext from "./../../../context/AuthContext";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import SettingsForm from "./SettingsForm";
import { Grid, Image } from "semantic-ui-react";

import "./Profile.scss";

export default function Profile() {
  const { username } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalChildren, setModalChildren] = useState(null);
  const authContext = useContext(AuthContext);
  const { auth } = useAuth();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username },
  });

  const avatarUrl = "http://localhost:3010/images/avatars";

  if (loading) return null;
  if (error) return <h1>An error ocurred: {error}</h1>;

  const { getUser: userData } = data;
  if (!userData) return <UserNotFound />;

  const openModal = (type) => {
    switch (type) {
      case "avatar":
        setModalTitle("My Avatar!");
        setModalChildren(<AvatarForm setShowModal={setShowModal} />);
        break;

      case "settings":
        setModalTitle("");
        setModalChildren(<SettingsForm setShowModal={setShowModal} />);
        break;
      default:
        break;
    }
    setShowModal(true);
  };

  const handleAvatarClick = () => {
    if (auth.username !== username) return;
    openModal("avatar");
  };

  return (
    <>
      <Grid className='profile'>
        <Grid.Column width='5' className='profile__left'>
          <Image
            src={
              auth.username === username
                ? authContext.auth.avatar
                  ? `${avatarUrl}/${authContext.auth.avatar}`
                  : noAvatar
                : userData.avatar
                ? `${avatarUrl}/${userData.avatar}`
                : noAvatar
            }
            avatar
            onClick={handleAvatarClick}
          />
        </Grid.Column>
        <Grid.Column width='11' className='profile__right'>
          <ProfileHeader userData={userData} openModal={openModal} />
          <div>Followers</div>
          <div className='other'>
            <p className='name'>{userData.name}</p>
            {userData.website && (
              <a
                href={`http://${userData.website}`}
                className='website'
                target='_blank'
                rel='noreferrer'>
                {userData.website}
              </a>
            )}
            {userData.description && (
              <p className='description'>{userData.description}</p>
            )}
          </div>
        </Grid.Column>
      </Grid>
      <BasicModal show={showModal} setShow={setShowModal} title={modalTitle}>
        {modalChildren}
      </BasicModal>
    </>
  );
}
