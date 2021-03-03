import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Image } from "semantic-ui-react";
import { urls } from "../../../config/config";
import { GET_FOLLOWED_PUBLICATIONS } from "../../../gql/publication";
import noAvatar from "../../../assets/images/noAvatar.png";
import CommentActions from "../../../components/common/CommentActions/CommentActions";
import CommentForm from "../../../components/forms/CommentForm/CommentForm";
import PublicationModal from "../../../components/Modal/PublicationModal/PublicationModal";
import Error from "../../../components/common/Error/Error";

import "./Feed.scss";

export default function Feed() {
  const { data, loading, error } = useQuery(GET_FOLLOWED_PUBLICATIONS);
  const [showPublicationModal, setShowPublicationModal] = useState(false);
  const [publicationToShow, setPublicationToShow] = useState(null);

  if (loading) return null;
  if (error) return <Error error={error} />;

  const { getFollowedPublications } = data;

  const openPublication = (p) => {
    setPublicationToShow(p);
    setShowPublicationModal(true);
  };

  return (
    <>
      <div className="feed">
        {getFollowedPublications.map((p, index) => (
          <div key={index} className="feed__box">
            <div className="feed__box-user">
              <Link to={`/${p.userId.username}`}>
                <Image
                  src={
                    p.userId.avatar
                      ? `${urls.userAvatarPath}/${p.userId.avatar}`
                      : noAvatar
                  }
                  avatar
                />
              </Link>
              <span>{p.userId.name}</span>
            </div>
            <div
              className="feed__box-photo"
              style={{
                backgroundImage: `url("${urls.publicationsPath}/${p.fileUrl}")`,
              }}
              onClick={() => openPublication(p)}
            />
            <div className="feed__box-actions">
              <CommentActions publication={p} />
            </div>
            <div className="feed__box-comment-form">
              <CommentForm publication={p} />
            </div>
          </div>
        ))}
      </div>
      {showPublicationModal && (
        <PublicationModal
          show={showPublicationModal}
          setShow={setShowPublicationModal}
          publication={publicationToShow}
        />
      )}
    </>
  );
}
