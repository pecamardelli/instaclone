import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import configurations from "../../../config/config";
import PublicationModal from "../../Modal/PublicationModal/PublicationModal";

import "./PublicationPreview.scss";

export default function PublicationPreview(props) {
  const [showPublicationModal, setShowPublicationModal] = useState(false);
  const { publication } = props;
  const { urls } = configurations;

  const handleClick = () => setShowPublicationModal(true);

  return (
    <>
      <div className="publication-preview" onClick={handleClick}>
        <Image
          className="publication-preview__image"
          src={`${urls.publicationsPath}/${publication.fileUrl}`}
        />
      </div>
      <PublicationModal
        show={showPublicationModal}
        setShow={setShowPublicationModal}
        publication={publication}
      />
    </>
  );
}
