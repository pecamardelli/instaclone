import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import "./LoginForm.scss";

export default function LoginForm() {
  const formik = useFormik({
    initialValues: getInitialValues(), // Defined below the component's code
    validationSchema: getValidationSchema(), // Defined below the component's code
    onSubmit: (formData) => {
      console.log("Submitting...", formData);
    },
  });

  return (
    <Form className='login-form' onSubmit={formik.handleSubmit}>
      <h2>Login to share photos and videos with your friends!</h2>
      <Form.Input
        type='text'
        placeholder='Your email address...'
        name='email'
        onChange={formik.handleChange}
      />
      <Form.Input
        type='password'
        placeholder='Your password...'
        name='password'
        onChange={formik.handleChange}
      />
      <Button type='submit' className='btn-submit'>
        Login
      </Button>
    </Form>
  );
}

function getInitialValues() {
  return {
    email: "",
    password: "",
  };
}

function getValidationSchema() {
  return null;
}
