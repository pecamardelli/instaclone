import React from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { updateUserMutation } from "../../../gql/userQueries";

import "./EmailForm.scss";
import { toast } from "react-toastify";

export default function EmailForm({ setShowModal, userData }) {
  const [updateUser] = useMutation(updateUserMutation());

  const formik = useFormik({
    initialValues: {
      email: userData.email || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: async (formData) => {
      try {
        const { data } = await updateUser({
          variables: {
            input: {
              email: formData.email,
            },
          },
        });

        console.dir({ data });

        if (data?.updateUser) {
          toast.success("Email successfully changed!");
          setShowModal(false);
        } else toast.error("Email is in use!");
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
