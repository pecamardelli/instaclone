import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import {
  FOLLOW_USER,
  IS_FOLLOWING,
  UNFOLLOW_USER,
} from "../../../../gql/follower";
import AuthContext from "./../../../../context/AuthContext";

import "./ProfileHeader.scss";

export default function ProfileHeader({ userData, openModal }) {
  const { auth } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);
  const [checkIfIsFollowing, { data, loading, error, called }] = useLazyQuery(
    IS_FOLLOWING
  );

  if (error) console.error(error);

  useEffect(() => {
    if (userData.username !== auth.username) {
      if (loading) return null;
      if (!called)
        checkIfIsFollowing({ variables: { username: userData.username } });

      if (data?.isFollowing) setIsFollowing(true);
    }
  }, [
    data,
    auth.username,
    called,
    checkIfIsFollowing,
    loading,
    userData.username,
  ]);

  const handleFollowUser = async () => {
    try {
      await followUser({ variables: { username: userData.username } });
      setIsFollowing(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollowUser = async () => {
    try {
      await unfollowUser({ variables: { username: userData.username } });
      setIsFollowing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-header">
      <h2>{userData.username}</h2>
      {userData.username === auth.username ? (
        <Button onClick={() => openModal("settings")}>Ajustes</Button>
      ) : isFollowing ? (
        <Button className="btn-danger" onClick={handleUnfollowUser}>
          Unfollow {userData.username}
        </Button>
      ) : (
        <Button className="btn-action" onClick={handleFollowUser}>
          Follow {userData.username}
        </Button>
      )}
    </div>
  );
}
