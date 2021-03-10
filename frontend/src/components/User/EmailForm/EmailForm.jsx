import React from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { getUserUpdateByIdMutation } from "../../../gql/userQueries";

import "./EmailForm.scss";

export default function EmailForm({ setShowModal, userData }) {
  const { auth, setUserData } = useAuth();
  const [userUpdateById] = useMutation(getUserUpdateByIdMutation());

  const formik = useFormik({
    initialValues: {
      email: userData.email || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: async (formData) => {
      try {
        const { data } = await userUpdateById({
          variables: {
            _id: auth.id,
            record: formData,
          },
        });

        if (data.userUpdateById?.recordId) {
          toast.success("Email successfully changed!");
          setUserData((userData) => ({ ...userData, ...formData }));
          setShowModal(false);
        }
        // else if (errors && Array.isArray(errors) && errors.length > 0) {
        //   // Grab the first error.
        //   const error = errors[0];
        //   toast.error(
        //     `${error.extensions.name}: code ${error.extensions.code}`
        //   );
        // }
      } catch (error) {
        toast.error(`Error: ${error.message || "Couldn't change email."}`);
      }
    },
  });

  return (
    <Form className="email-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="text"
        name="email"
        placeholder="Enter your new email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <Button type="submit" className="btn-submit">
        Change
      </Button>
    </Form>
  );
}
