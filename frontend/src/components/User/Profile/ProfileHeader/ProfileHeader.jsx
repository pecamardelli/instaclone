import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import AuthContext from "./../../../../context/AuthContext";

import "./ProfileHeader.scss";

export default function ProfileHeader({ userData, openModal }) {
  const { auth } = useContext(AuthContext);

  return (
    <div className='profile-header'>
      <h2>{userData.username}</h2>
      {userData.username === auth.username ? (
        <Button onClick={() => openModal("settings")}>Ajustes</Button>
      ) : (
        <Button>Seguir</Button>
      )}
    </div>
  );
}
