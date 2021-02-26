import React from "react";
import { Button, Form } from "semantic-ui-react";
import "./CommentForm.scss";

export default function CommentForm() {
  return (
    <Form className="comment-form">
      <Form.Input placeholder="Add a comment..." name="comment" />
      <Button type="submit">Publish</Button>
    </Form>
  );
}
