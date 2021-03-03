import React from "react";
import { Modal } from "semantic-ui-react";

import "./BasicModal.scss";

export default function BasicModal(props) {
  const { show, setShow, title, children } = props;

  return (
    <Modal
      size="mini"
      open={show}
      onClose={() => setShow(false)}
      className="basic-modal"
    >
      {title && <Modal.Header>{title}</Modal.Header>}
      {children}
    </Modal>
  );
}
