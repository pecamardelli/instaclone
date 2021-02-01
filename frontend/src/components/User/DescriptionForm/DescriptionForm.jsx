import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { UPDATE_USER } from "../../../gql/user";

import "./DescriptionForm.scss";
import { toast } from "react-toastify";

export default function DescriptionForm(props) {
  const { setShowModal, userData } = props;
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      description: userData.description || "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        const { data } = await updateUser({
          variables: {
            input: formData,
          },
        });

        if (!data) return toast.error(`Couldn't update bio!`);

        toast.success("Bio successfully updated!");
        setShowModal(false);
      } catch (error) {
        toast.error(`Couldn't update bio: ${error.message || ""}`);
      }
    },
  });

  return (
    <Form className='description-form' onSubmit={formik.handleSubmit}>
      <Form.TextArea
        name='description'
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.errors.description && true}
      />
      <Button type='submit' className='btn-submit'>
        Change bio
      </Button>
    </Form>
  );
}