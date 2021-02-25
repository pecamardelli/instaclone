import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_FOLLOWEDS, GET_FOLLOWERS } from "../../../../gql/follower";
import SearchResult from "../../../common/SearchResult/SearchResult";
import BasicModal from "../../../Modal/BasicModal/BasicModal";

import "./Followers.scss";

export default function Followers(props) {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalChildren, setModalChildren] = useState(null);

  const { username } = props;
  const {
    data: followersData,
    loading: followersLoading,
    //startPolling: startPollingFollowers,
    //stopPolling: stopPollingFollowers,
  } = useQuery(GET_FOLLOWERS, {
    variables: { username },
  });

  const {
    data: followedsData,
    loading: followedsLoading,
  } = useQuery(GET_FOLLOWEDS, { variables: { username } });

  // In the course, the teacher does this to get realtime followers count.
  // I'll disable it because it's a terrible idea.
  // useEffect(() => {
  //   startPollingFollowers(1000);
  //   return () => {
  //     stopPollingFollowers();
  //   };
  // }, [startPollingFollowers, stopPollingFollowers]);

  if (followersLoading || followedsLoading) return null;

  const { getFollowers } = followersData;
  const { getFolloweds } = followedsData;

  const handleShowModal = (list, title) => {
    setShowModal(true);
    setModalTitle(title);
    setModalChildren(
      list.map((f, index) => {
        return (
          <SearchResult
            key={index}
            data={{
              title: f.name,
              username: f.username,
              avatar: f.avatar,
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
          <span>??</span> posts
        </p>
        <p
          className="link"
          onClick={() =>
            handleShowModal(getFollowers, `${username}'s followers`)
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
