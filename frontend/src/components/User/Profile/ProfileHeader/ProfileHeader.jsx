import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import {
  followUserMutation,
  isFollowingQuery,
  unfollowUserMutation,
} from "../../../../gql/follower";
import Error from "../../../common/Error/Error";
import AuthContext from "./../../../../context/AuthContext";

import "./ProfileHeader.scss";

export default function ProfileHeader({ userData, openModal }) {
  const { auth } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followUser] = useMutation(followUserMutation());
  const [unfollowUser] = useMutation(unfollowUserMutation());
  const [checkIfIsFollowing, { data, loading, error, called }] = useLazyQuery(
    isFollowingQuery()
  );

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

  if (error) return <Error error={error} />;

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
