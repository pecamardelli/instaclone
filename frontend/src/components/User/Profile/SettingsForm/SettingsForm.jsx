import React from "react";
import { useApolloClient } from "@apollo/client";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

import "./SettingsForm.scss";
import PasswordForm from "../../PasswordForm/PasswordForm";
import EmailForm from "../../EmailForm/EmailForm";
import DescriptionForm from "../../DescriptionForm/DescriptionForm";
import WebsiteForm from "../../WebsiteForm/WebsiteForm";

export default function SettingsForm(props) {
  const { setShowModal, setModalTitle, setModalChildren, userData } = props;
  const { logout } = useAuth();
  const history = useHistory();
  const client = useApolloClient();

  const handleChangePassword = () => {
    setModalTitle("Change your password");
    setModalChildren(<PasswordForm setShowModal={setShowModal} />);
  };

  const handleChangeEmail = () => {
    setModalTitle("Change your email");
    setModalChildren(
      <EmailForm setShowModal={setShowModal} userData={userData} />
    );
  };

  const handleChangeDescription = () => {
    setModalTitle("Change your biography");
    setModalChildren(
      <DescriptionForm setShowModal={setShowModal} userData={userData} />
    );
  };

  const handleChangeWebsite = () => {
    setModalTitle("Change your personal website");
    setModalChildren(
      <WebsiteForm setShowModal={setShowModal} userData={userData} />
    );
  };

  const handleLogout = () => {
    client.clearStore();
    logout();
    history.push("/");
  };

  return (
    <div className='settings-form'>
      <Button onClick={handleChangePassword}>Change password</Button>
      <Button onClick={handleChangeEmail}>Change email</Button>
      <Button onClick={handleChangeDescription}>Add description</Button>
      <Button onClick={handleChangeWebsite}>Website</Button>
      <Button onClick={handleLogout}>Logout</Button>
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
    </div>
  );
}
