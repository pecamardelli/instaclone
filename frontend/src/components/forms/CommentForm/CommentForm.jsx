import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { publications } from "../../../config/config";
import "./CommentForm.scss";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../../gql/comment";
import { toast } from "react-toastify";

export default function CommentForm(props) {
  const { publication } = props;
  const [addComment] = useMutation(ADD_COMMENT);

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
        await addComment({
          variables: {
            input: {
              publicationId: publication.id,
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
