import React from "react";
import { Grid, Modal } from "semantic-ui-react";
import { urls } from "../../../config/config";
import CommentActions from "../../common/CommentActions/CommentActions";
import CommentList from "../../common/CommentList/CommentList";
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
            backgroundImage: `url("${urls.publicationsPath}/${publication.fileName}.${publication.fileExtension}")`,
          }}
        />
        <Grid.Column className="publication-modal__right" width={6}>
          <CommentList publication={publication} />
          <CommentActions publication={publication} />
          <CommentForm publication={publication} />
        </Grid.Column>
      </Grid>
    </Modal>
  );
}
