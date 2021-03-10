import React from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { Button, Form } from "semantic-ui-react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { getUserUpdateByIdMutation } from "../../../gql/userQueries";
import useAuth from "../../../hooks/useAuth";

import "./WebsiteForm.scss";

export default function WebsiteForm(props) {
  const { setShowModal, userData } = props;
  const { auth, setUserData } = useAuth();
  const [userUpdateById] = useMutation(getUserUpdateByIdMutation());

  const formik = useFormik({
    initialValues: {
      website: userData.website || "",
    },
    validationSchema: Yup.object({
      website: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await userUpdateById({
          variables: {
            _id: auth.id,
            record: formData,
          },
        });

        toast.success("Website successfully updated!");
        setUserData((userData) => ({ ...userData, ...formData }));
        setShowModal(false);
      } catch (error) {
        toast.error(`Couldn't set website: ${error.message || ""}`);
      }
    },
  });

  return (
    <Form className="website-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="website"
        placeholder="Enter your new website url"
        value={formik.values.website}
        onChange={formik.handleChange}
        error={formik.errors.website && true}
      />
      <Button type="submit" className="btn-submit">
        Change
      </Button>
    </Form>
  );
}
