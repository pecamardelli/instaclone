import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { getFollowerManyQuery } from "../../../../gql/followerQueries";
import Error from "../../../common/Error/Error";
import UserCard from "../../../common/UserCard/UserCard";
import BasicModal from "../../../Modal/BasicModal/BasicModal";
import useAuth from "../../../../hooks/useAuth";

import "./Followers.scss";

export default function Followers(props) {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalChildren, setModalChildren] = useState(null);
  const { auth } = useAuth();
  const { username, totalPublications } = props;

  const {
    data: followersData,
    loading: followersLoading,
    error: followersError,
    //startPolling: startPollingFollowers,
    //stopPolling: stopPollingFollowers,
  } = useQuery(
    getFollowerManyQuery("followId follower { name username avatar }"),
    { variables: { filter: { userId: auth.id } } }
  );

  const {
    data: followedsData,
    loading: followedsLoading,
    error: followedsError,
  } = useQuery(getFollowerManyQuery("userId user { name username avatar }"), {
    variables: { username },
  });

  // In the course, the teacher does this to get realtime followers count.
  // I'll comment this because it's a terrible idea.
  // useEffect(() => {
  //   startPollingFollowers(1000);
  //   return () => {
  //     stopPollingFollowers();
  //   };
  // }, [startPollingFollowers, stopPollingFollowers]);

  if (followersLoading || followedsLoading) return null;

  if (followersError) return <Error error={followersError} />;
  if (followedsError) return <Error error={followedsError} />;

  const { followerMany: getFollowers } = followersData;
  const { followerMany: getFolloweds } = followedsData;

  const handleShowModal = (list, title) => {
    setShowModal(true);
    setModalTitle(title);
    setModalChildren(
      list.map((f, index) => {
        return (
          <UserCard
            key={index}
            data={{
              // There must be either a user or a follower object
              title: f.user ? f.user.name : f.follower.name,
              username: f.user ? f.user.username : f.follower.username,
              avatar: f.user ? f.user.avatar : f.follower.avatar,
            }}
          />
        );
      })
    );
  };

  return (
    <>
      <div className="followers">
        <p>
          <span>{totalPublications}</span> posts
        </p>
        <p
          className="link"
          onClick={() =>
            handleShowModal(getFollowers, `${username}'s followers list`)
          }
        >
          <span>{getFollowers.length}</span> follower
          {getFollowers.length === 1 ? "" : "s"}
        </p>
        <p
          className="link"
          onClick={() =>
            handleShowModal(getFolloweds, `${username}'s following list`)
          }
        >
          <span>{getFolloweds.length}</span> friend
          {getFolloweds.length === 1 ? "" : "s"} followed
        </p>
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={modalTitle}>
        {modalChildren}
      </BasicModal>
    </>
  );
}
