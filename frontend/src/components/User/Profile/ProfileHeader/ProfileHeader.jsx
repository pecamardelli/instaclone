import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import useAuth from "../../../../hooks/useAuth";
import { Button } from "semantic-ui-react";
import {
  getFollowerCreateOneMutation,
  getFollowerOneQuery,
  getFollowerRemoveOneMutation,
} from "../../../../gql/followerQueries";
import Error from "../../../common/Error/Error";

import "./ProfileHeader.scss";

export default function ProfileHeader({ userData, openModal }) {
  const { auth } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCreateOne] = useMutation(getFollowerCreateOneMutation());
  const [followerRemoveOne] = useMutation(getFollowerRemoveOneMutation());
  const [followerOne, { data, loading, error, called }] = useLazyQuery(
    getFollowerOneQuery()
  );

  useEffect(() => {
    if (userData._id !== auth.id) {
      if (loading) return null;
      if (!called)
        followerOne({
          variables: { filter: { userId: auth.id, followId: userData._id } },
        });

      if (data?.followerOne) setIsFollowing(true);
    }
  }, [data, auth.id, called, followerOne, loading, userData._id]);

  if (error) return <Error error={error} />;

  const handleFollowUser = async () => {
    try {
      await followerCreateOne({
        variables: { record: { userId: auth.id, followId: userData._id } },
      });
      setIsFollowing(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollowUser = async () => {
    try {
      await followerRemoveOne({
        variables: { filter: { userId: auth.id, followId: userData._id } },
      });
      setIsFollowing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-header">
      <h2>{userData.username}</h2>
      {userData._id === auth.id ? (
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
