import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Image } from "semantic-ui-react";
import { urls } from "../../../config/config";
import { getPublicationManyOfFollowedsQuery } from "../../../gql/publicationQueries";
import noAvatar from "../../../assets/images/noAvatar.png";
import CommentActions from "../../../components/common/CommentActions/CommentActions";
import CommentForm from "../../../components/forms/CommentForm/CommentForm";
import PublicationModal from "../../../components/Modal/PublicationModal/PublicationModal";
import Error from "../../../components/common/Error/Error";
import { map } from "lodash";

import "./Feed.scss";

export default function Feed() {
  const { data, loading, error } = useQuery(
    getPublicationManyOfFollowedsQuery()
  );
  const [showPublicationModal, setShowPublicationModal] = useState(false);
  const [publicationToShow, setPublicationToShow] = useState(null);

  if (loading) return null;
  if (error) return <Error error={error} />;
  if (!data.publicationManyOfFolloweds)
    return <Error error={{ message: "No data received from backend." }} />;

  const { publicationManyOfFolloweds } = data;

  const openPublication = (p) => {
    setPublicationToShow(p);
    setShowPublicationModal(true);
  };

  return (
    <>
      <div className="feed">
        {map(publicationManyOfFolloweds, (p, index) => (
          <div key={index} className="feed__box">
            <div className="feed__box-user">
              <Link to={`/${p.user.username}`}>
                <Image
                  src={
                    p.user.avatar
                      ? `${urls.userAvatarPath}/${p.user.avatar}`
                      : noAvatar
                  }
                  avatar
                />
              </Link>
              <span>{p.user.name}</span>
            </div>
            <div
              className="feed__box-photo"
              style={{
                backgroundImage: `url("${urls.publicationsPath}/${p.fileName}.${p.fileExtension}")`,
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
