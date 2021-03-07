import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { getRegisterUserMutation } from "./../../../gql/userQueries";
import { toast } from "react-toastify";
import * as Yup from "yup";

import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setShowLogin } = props;
  const [registerUser] = useMutation(getRegisterUserMutation());

  const formik = useFormik({
    initialValues: getInitialValues(), // Defined below the component's code
    validationSchema: getValidationSchema(), // Defined below the component's code
    onSubmit: async (formData) => {
      try {
        const userData = { ...formData };
        delete userData.passwordAgain;

        await registerUser({
          variables: { input: userData },
        });

        toast.success("User successfully created!");
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    },
  });

  return (
    <>
      <h2 className="register-form-title">
        Register to Instaclone and share photos and videos.
      </h2>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Your name..."
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name && true}
        />
        <Form.Input
          type="text"
          placeholder="Your username..."
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username && true}
        />
        <Form.Input
          type="text"
          placeholder="Your email..."
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email && true}
        />
        <Form.Input
          type="password"
          placeholder="Your password..."
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password && true}
        />
        <Form.Input
          type="password"
          placeholder="Your password again..."
          name="passwordAgain"
          value={formik.values.passwordAgain}
          onChange={formik.handleChange}
          error={formik.errors.passwordAgain && true}
        />
        <Button className="btn-submit" type="submit">
          Register
        </Button>
        <Button
          type="button"
          className="btn-reset"
          onClick={formik.handleReset}
        >
          Reset
        </Button>
      </Form>
    </>
  );
}

function getInitialValues() {
  return {
    name: "",
    username: "",
    email: "",
    password: "",
    passwordAgain: "",
  };
}

function getValidationSchema() {
  return Yup.object({
    name: Yup.string().required("Your name is required"),
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9-]*$/,
        "Username must have alphanumerical characters only."
      )
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format.")
      .required("Email is required."),
    password: Yup.string()
      .oneOf([Yup.ref("passwordAgain")], "Passwords don't match.")
      .required("Password is required."),
    passwordAgain: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords don't match.")
      .required("Please, reenter your password."),
  });
}
