import React from "react";
import { Grid, Modal } from "semantic-ui-react";
import { urls } from "../../../config/config";
import CommentForm from "../../forms/CommentForm/CommentForm";
import "./PublicationModal.scss";

export default function PublicationModal(props) {
  const { show, setShow, publication } = props;
  const handleClose = () => setShow(false);

  return (
    <Modal open={show} onClose={handleClose} className="publication-modal">
      <Grid>
        <Grid.Column
          className="publication-modal__left"
          width={10}
          style={{
            backgroundImage: `url("${urls.publicationsPath}/${publication.fileUrl}")`,
          }}
        />
        <Grid.Column className="publication-modal__right" width={6}>
          <h3>Actions</h3>
          <h3>Comments</h3>
          <CommentForm publication={publication} />
        </Grid.Column>
      </Grid>
    </Modal>
  );
}
