import React, { useCallback } from "react";
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { UPDATE_AVATAR } from "../../../gql/user";
import "./AvatarForm.scss";
import { useMutation } from "@apollo/client";

export default function AvatarForm(props) {
  const { setShowModal } = props;

  const [updateAvatar] = useMutation(UPDATE_AVATAR);

  const onDrop = useCallback(
    async (uploadedFile) => {
      const avatarImage = uploadedFile[0];
      try {
        const result = await updateAvatar({ variables: { file: avatarImage } });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
    [updateAvatar]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <div className='avatar-form'>
      <Button {...getRootProps()}>Subir foto</Button>
      <Button>Eliminar foto</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      <input {...getInputProps()} />
    </div>
  );
}
