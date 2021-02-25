import React from "react";
import { Image } from "semantic-ui-react";
import "./PublicationPreview.scss";
import config from "../../../config/config";

export default function PublicationPreview(props) {
  const { publication } = props;
  const { urls } = config;

  console.log(publication);
  return (
    <div className="publication-preview">
      <Image
        className="publication-preview__image"
        src={`${urls.publicationsPath}/${publication.fileUrl}`}
      />
    </div>
  );
}
