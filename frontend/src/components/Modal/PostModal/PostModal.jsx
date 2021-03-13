import React, { useCallback, useState } from "react";
import { Button, Dimmer, Icon, Loader, Modal } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { getPublicationCreateOneMutation } from "../../../gql/publicationQueries";
import useAuth from "../../../hooks/useAuth";

import "./PostModal.scss";

export default function PostModal(props) {
  const { show, setShow } = props;
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const [publicationCreateOne] = useMutation(getPublicationCreateOneMutation());

  const onDrop = useCallback(
    (upload) => {
      const file = upload[0];
      if (!file) return console.error("No file uploaded");

      setUploadedFile({
        type: "image",
        file,
        preview: URL.createObjectURL(file),
      });
    },
    [setUploadedFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const handleClose = () => setShow(false);

  const handlePublish = async () => {
    try {
      setIsLoading(true);
      await publicationCreateOne({
        variables: {
          file: uploadedFile.file,
          record: {
            userId: auth.id,
            fileName: "",
            fileExtension: "",
          },
        },
      });
      setIsLoading(false);
      setShow(false);
      setUploadedFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      className="post-modal"
      open={show}
      size="small"
      onClose={handleClose}
    >
      <div
        {...getRootProps()}
        className="dropzone"
        style={uploadedFile && { border: "0" }}
      >
        {!uploadedFile && (
          <>
            <Icon name="cloud upload" />
            <p>Drop your images here</p>
          </>
        )}
        <input {...getInputProps()} />
      </div>
      {uploadedFile?.type === "image" && (
        <div
          className="upload-preview"
          style={{ backgroundImage: `url("${uploadedFile.preview}")` }}
        />
      )}

      {uploadedFile && (
        <Button className="btn-upload btn-action" onClick={handlePublish}>
          Publish
        </Button>
      )}

      {isLoading && (
        <Dimmer active className="publishing">
          <Loader />
          <p>Publishing your photo...</p>
        </Dimmer>
      )}
    </Modal>
  );
}
