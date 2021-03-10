import React, { useCallback, useState } from "react";
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import {
  getUserOneQuery,
  getUserUpdateAvatarMutation,
  deleteAvatarMutation,
} from "../../../gql/userQueries";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

import "./AvatarForm.scss";

export default function AvatarForm(props) {
  const { setShowModal } = props;
  const [loading, setLoading] = useState(false);
  const { auth, setUserData } = useAuth();

  // The second argument updates the Apollo cache with the new avatar url
  // It doesn't work if the images have the same uploaded name (same url as well).
  // This is a bug that wasn't fixed in the course, so implementing a context
  // would be a solution to this.
  const [userUpdateAvatar] = useMutation(getUserUpdateAvatarMutation(), {
    update(cache, { data: { userUpdateAvatar } }) {
      const { userOne } = cache.readQuery({
        query: getUserOneQuery(),
        variables: { filter: { username: auth.username } },
      });

      cache.writeQuery({
        query: getUserOneQuery(),
        variables: { filter: { username: auth.username } },
        data: {
          userOne: { ...userOne, avatar: userUpdateAvatar.avatar },
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
        const { data } = await userUpdateAvatar({
          variables: { file: avatarImage },
        });

        if (!data.userUpdateAvatar.recordId) {
          toast.error("Failed to upload avatar!");
        } else {
          setUserData({
            ...auth,
            avatar: data.userUpdateAvatar.record.avatar,
          });
          setShowModal(false);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    },
    [userUpdateAvatar, setShowModal, auth, setUserData]
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
        setUserData({ ...auth, avatar: "" });
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
