import React, { useCallback } from "react";
import { Modal } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import "./PostModal.scss";

export default function PostModal(props) {
  const { show, setShow } = props;
  const onDrop = useCallback((upload) => {
    console.log({ upload });
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const handleClose = () => setShow(false);

  return (
    <Modal
      className="post-modal"
      open={show}
      size="small"
      onClose={handleClose}
    >
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
      </div>
    </Modal>
  );
}
