import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_USER } from "../../gql/user";
import userAuth from "../../hooks/useAuth";
import { Grid, Image } from "semantic-ui-react";
import noAvatar from "../../assets/images/avatar.png";
import { useQuery } from "@apollo/client";
import "./Profile.scss";
import UserNotFound from "../UserNotFound/UserNotFound";
import BasicModal from "../Modal/BasicModal";
import AvatarForm from "../User/AvatarForm/AvatarForm";

export default function Profile() {
  const { username } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalChildren, setModalChildren] = useState(null);

  const { auth } = userAuth();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username },
  });

  if (loading) return null;
  if (error) return <h1>An error ocurred: {error}</h1>;

  const { getUser: userData } = data;
  if (!userData) return <UserNotFound />;

  const openModal = (type) => {
    switch (type) {
      case "avatar":
        setModalTitle("My Avatar!");
        setModalChildren(<AvatarForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;

      default:
        break;
    }
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
            src={`http://localhost:3010/images/avatars/${userData.id}.jpeg`}
            avatar
            onClick={handleAvatarClick}
          />
        </Grid.Column>
        <Grid.Column width='11' className='profile__right'>
          <div>Profile Header</div>
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
