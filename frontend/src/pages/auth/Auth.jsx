import React, { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import RegisterForm from "./../../components/Auth/RegisterForm";
import logo from "../../assets/images/logo.png";
import "./Auth.scss";

export default function Auth() {
  const [showLogin, setShowLogin] = useState();

  return (
    <Container fluid className='auth'>
      <Image src={logo} />

      <div className='container-form'>
        {showLogin ? (
          <p>Login form</p>
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>

      <div className='change-form'>
        <p>
          {showLogin ? (
            <>
              Don't have an account?
              <span onClick={() => setShowLogin(!showLogin)}>Register!</span>
            </>
          ) : (
            <>
              Already registered?
              <span onClick={() => setShowLogin(!showLogin)}>Login</span>
            </>
          )}
        </p>
      </div>
    </Container>
  );
}
