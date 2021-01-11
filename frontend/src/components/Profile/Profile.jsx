import React from "react";
import { useParams } from "react-router-dom";
import { GET_USER } from "../../gql/user";
import { Grid, Image } from "semantic-ui-react";
import noAvatar from "../../assets/images/avatar.png";
import { useQuery } from "@apollo/client";
import "./Profile.scss";
import UserNotFound from "../UserNotFound/UserNotFound";

export default function Profile() {
  const { username } = useParams();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username },
  });

  if (loading) return null;
  if (error) return <h1>An error ocurred: {error}</h1>;

  const { getUser: userData } = data;
  if (!userData) return <UserNotFound />;

  return (
    <>
      <Grid className="profile">
        <Grid.Column width="5" className="profile__left">
          <Image src={noAvatar} avatar />
        </Grid.Column>
        <Grid.Column width="11" className="profile__right">
          <div>Profile Header</div>
          <div>Followers</div>
          <div className="other">
            <p className="name">{userData.name}</p>
            {userData.website && (
              <a
                href={`http://${userData.website}`}
                className="website"
                target="_blank"
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
    </>
  );
}
