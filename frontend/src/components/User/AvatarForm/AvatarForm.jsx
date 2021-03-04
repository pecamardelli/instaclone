import React, { useCallback, useContext, useState } from "react";
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import {
  getUserQuery,
  updateAvatarMutation,
  deleteAvatarMutation,
} from "../../../gql/user";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import AuthContext from "./../../../context/AuthContext";

import "./AvatarForm.scss";

export default function AvatarForm(props) {
  const { setShowModal } = props;
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const authContext = useContext(AuthContext);

  // The second argument updates the Apollo cache with the new avatar url
  // It doesn't work if the images have the same uploaded name (same url as well).
  // This is a bug that wasn't fixed in the course, so implementing a context
  // would be a solution to this.
  const [updateAvatar] = useMutation(updateAvatarMutation(), {
    update(cache, { data: { updateAvatar } }) {
      const { getUser } = cache.readQuery({
        query: getUserQuery(),
        variables: { username: auth.username },
      });

      cache.writeQuery({
        query: getUserQuery,
        variables: { username: auth.username },
        data: {
          getUser: { ...getUser, avatar: updateAvatar.avatar },
        },
      });
    },
  });

  const [deleteAvatar] = useMutation(deleteAvatarMutation());

  const onDrop = useCallback(
    async (uploadedFile) => {
      const avatarImage = uploadedFile[0];
      try {
        setLoading(true);
        const result = await updateAvatar({ variables: { file: avatarImage } });
        const { data } = result;

        if (!data.updateAvatar.status) {
          toast.error("Failed to upload avatar!");
        } else {
          authContext.setUserData({
            ...authContext.auth,
            avatar: data.updateAvatar.avatarUrl,
          });
          setShowModal(false);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [updateAvatar, setShowModal, authContext]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const handleDeleteAvatar = async () => {
    try {
      const { data } = await deleteAvatar();

      if (!data.deleteAvatar) {
        toast.error("Failed to delete avatar!");
      } else {
        toast.success("Avatar deleted!");
        authContext.setUserData({ ...authContext.auth, avatar: "" });
        setShowModal(false);
      }
    } catch (error) {
      toast.error(
        `Failed to delete avatar: ${error.message ? error.message : error}`
      );
    }
  };

  return (
    <div className="avatar-form">
      <Button {...getRootProps()} loading={loading}>
        Subir foto
      </Button>
      <Button disabled={loading} onClick={handleDeleteAvatar}>
        Eliminar foto
      </Button>
      <Button disabled={loading} onClick={() => setShowModal(false)}>
        Cancelar
      </Button>
      <input {...getInputProps()} />
    </div>
  );
}
