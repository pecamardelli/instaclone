import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { getLoginMutation } from "../../../gql/userQueries";
import { decodeToken, setToken } from "../../../utils/token";
import useAuth from "../../../hooks/useAuth";
import * as Yup from "yup";

import "./LoginForm.scss";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [userLogin] = useMutation(getLoginMutation());
  const { setUserData } = useAuth();

  const formik = useFormik({
    initialValues: getInitialValues(), // Defined below the component's code
    validationSchema: getValidationSchema(), // Defined below the component's code
    onSubmit: async (formData) => {
      setError("");
      try {
        const { data } = await userLogin({
          variables: {
            record: {
              email: formData.email,
              password: formData.password,
            },
          },
        });
        const { token } = data.userLogin;
        setToken(token);
        setUserData(decodeToken(token));
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      }
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <h2>Login to share photos and videos with your friends!</h2>
      <Form.Input
        type="text"
        placeholder="Your email address..."
        name="email"
        onChange={formik.handleChange}
        error={formik.errors.email && true}
      />
      <Form.Input
        type="password"
        placeholder="Your password..."
        name="password"
        onChange={formik.handleChange}
        error={formik.errors.password && true}
      />
      <Button type="submit" className="btn-submit">
        Login
      </Button>
      {error && <h4 className="submit-error">{error}</h4>}
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
  return Yup.object({
    email: Yup.string()
      .email("Please, enter a valid email.")
      .required("Please, enter your email."),
    password: Yup.string().required("Please, enter your password."),
  });
}
