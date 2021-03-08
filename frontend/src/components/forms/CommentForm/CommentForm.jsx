import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { publications } from "../../../config/config";
import { useMutation } from "@apollo/client";
import { getCommentCreateOneMutation } from "../../../gql/commentQueries";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import useAuth from "../../../hooks/useAuth";

import "./CommentForm.scss";

export default function CommentForm(props) {
  const { publication } = props;
  const { auth } = useAuth(AuthContext);
  const [commentCreateOne] = useMutation(getCommentCreateOneMutation());

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string()
        .required()
        .max(publications.maxCommentLength || 256),
    }),
    onSubmit: async (formData) => {
      try {
        await commentCreateOne({
          variables: {
            record: {
              publicationId: publication._id,
              userId: auth.id,
              text: formData.comment,
            },
          },
        });
        formik.resetForm();
      } catch (error) {
        console.error(error);
        toast.error(`Error adding comment: ${error.message || error.text}`);
      }
    },
  });

  return (
    <Form className="comment-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Add a comment..."
        name="comment"
        value={formik.values.comment}
        onChange={formik.handleChange}
        error={formik.errors.comment && true}
      />
      <Button type="submit">Publish</Button>
    </Form>
  );
}
