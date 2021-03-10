import React from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button, Form } from "semantic-ui-react";
import { getUserUpdateByIdMutation } from "../../../gql/userQueries";
import useAuth from "../../../hooks/useAuth";
import * as Yup from "yup";

import "./DescriptionForm.scss";

export default function DescriptionForm(props) {
  const { setShowModal, userData } = props;
  const { auth, setUserData } = useAuth();
  const [userUpdateById] = useMutation(getUserUpdateByIdMutation());

  const formik = useFormik({
    initialValues: {
      description: userData.description || "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await userUpdateById({
          variables: {
            _id: auth.id,
            record: formData,
          },
        });

        toast.success("Bio successfully updated!");
        setUserData((userData) => ({ ...userData, ...formData }));
        setShowModal(false);
      } catch (error) {
        toast.error(`Couldn't update bio: ${error.message || ""}`);
      }
    },
  });

  return (
    <Form className="description-form" onSubmit={formik.handleSubmit}>
      <Form.TextArea
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.errors.description && true}
      />
      <Button type="submit" className="btn-submit">
        Change bio
      </Button>
    </Form>
  );
}
