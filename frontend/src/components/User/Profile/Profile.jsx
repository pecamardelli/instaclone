import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getUserOneQuery } from "../../../gql/userQueries";
import useAuth from "../../../hooks/useAuth";
import noAvatar from "../../../assets/images/noAvatar.png";
import UserNotFound from "../../UserNotFound/UserNotFound";
import BasicModal from "../../Modal/BasicModal/BasicModal";
import AvatarForm from "../AvatarForm/AvatarForm";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import SettingsForm from "./SettingsForm/SettingsForm";
import { Grid, Image } from "semantic-ui-react";
import Followers from "./Followers/Followers";
import { urls } from "../../../config/config";
import Error from "../../common/Error/Error";

import "./Profile.scss";

export default function Profile(props) {
  const { totalPublications } = props;
  const { username } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalChildren, setModalChildren] = useState(null);
  const { auth } = useAuth();

  const { data, loading, error } = useQuery(getUserOneQuery(), {
    variables: { filter: { username } },
  });

  if (loading) return null;
  if (error) return <Error error={error} />;

  const { userOne: userData } = data;
  if (!userData) return <UserNotFound />;

  const openModal = (type) => {
    switch (type) {
      case "avatar":
        setModalTitle("My Avatar!");
        setModalChildren(<AvatarForm setShowModal={setShowModal} />);
        break;

      case "settings":
        setModalTitle("");
        setModalChildren(
          <SettingsForm
            setShowModal={setShowModal}
            setModalTitle={setModalTitle}
            setModalChildren={setModalChildren}
            userData={userData}
          />
        );
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
      <Grid className="profile">
        <Grid.Column width="5" className="profile__left">
          <Image
            src={
              auth.username === username
                ? auth.avatar
                  ? `${urls.userAvatarPath}/${auth.avatar}`
                  : noAvatar
                : userData.avatar
                ? `${urls.userAvatarPath}/${userData.avatar}`
                : noAvatar
            }
            avatar
            onClick={handleAvatarClick}
          />
        </Grid.Column>
        <Grid.Column width="11" className="profile__right">
          <ProfileHeader userData={userData} openModal={openModal} />
          <Followers
            username={userData.username}
            totalPublications={totalPublications}
          />
          <div className="other">
            <p className="name">{userData.name}</p>
            {userData.website && (
              <a
                href={`http://${userData.website}`}
                className="website"
                target="_blank"
                rel="noreferrer"
              >
                {userData.website}
              </a>
            )}
            {userData.description && (
              <p className="description">{userData.description}</p>
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
