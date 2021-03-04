import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { updateUserMutation } from "../../../gql/user";
import { toast } from "react-toastify";

import "./WebsiteForm.scss";

export default function WebsiteForm(props) {
  const { setShowModal, userData } = props;
  const [updateUser] = useMutation(updateUserMutation());

  const formik = useFormik({
    initialValues: {
      website: userData.website || "",
    },
    validationSchema: Yup.object({
      website: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        const { data } = await updateUser({
          variables: {
            input: {
              website: formData.website,
            },
          },
        });

        if (!data.updateUser) return toast.error(`An error ocurred: ${data}`);

        toast.success("Website successfully updated!");
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
