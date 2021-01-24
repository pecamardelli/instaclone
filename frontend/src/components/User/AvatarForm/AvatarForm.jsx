import React, { useCallback, useState } from "react";
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { UPDATE_AVATAR } from "../../../gql/user";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import "./AvatarForm.scss";

export default function AvatarForm(props) {
  const { setShowModal } = props;
  const [loading, setLoading] = useState(false);

  const [updateAvatar] = useMutation(UPDATE_AVATAR);

  const onDrop = useCallback(
    async (uploadedFile) => {
      const avatarImage = uploadedFile[0];
      try {
        setLoading(true);
        const result = await updateAvatar({ variables: { file: avatarImage } });
        const { data } = result;
        //console.log(result);

        if (!data.updateAvatar.status) {
          toast.error("Failed to upload avatar!");
        } else {
          setShowModal(false);
        }
        setLoading(false);
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
      <Button {...getRootProps()} loading={loading}>
        Subir foto
      </Button>
      <Button disabled={loading}>Eliminar foto</Button>
      <Button disabled={loading} onClick={() => setShowModal(false)}>
        Cancelar
      </Button>
      <input {...getInputProps()} />
    </div>
  );
}
