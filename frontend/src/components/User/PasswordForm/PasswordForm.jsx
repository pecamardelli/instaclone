import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { getUserUpdateByIdMutation } from "../../../gql/userQueries";
import useAuth from "../../../hooks/useAuth";

import "./PasswordForm.scss";

export default function PasswordForm(props) {
  const { setShowModal } = props;
  const { auth } = useAuth();
  const [userUpdateById] = useMutation(getUserUpdateByIdMutation());

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: getValidationSchema(),
    onSubmit: async (formData) => {
      try {
        await userUpdateById({
          variables: {
            _id: auth.id,
            record: {
              password: formData.password,
            },
          },
        });

        toast.success("Password successfully updated!");
        setShowModal(false);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    },
  });

  return (
    <Form className="password-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="password"
        placeholder="Current password"
        name="currentPassword"
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        error={formik.errors.currentPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="New password"
        name="newPassword"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        error={formik.errors.newPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="Repeat password"
        name="repeatPassword"
        value={formik.values.repeatPassword}
        onChange={formik.handleChange}
        error={formik.errors.repeatPassword && true}
      />
      <Button className="btn-submit" type="submit">
        Change
      </Button>
    </Form>
  );
}

function getValidationSchema() {
  return Yup.object({
    currentPassword: Yup.string().required(),
    newPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("repeatPassword")]),
    repeatPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("newPassword")]),
  });
}

function getInitialValues() {
  return {
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  };
}
