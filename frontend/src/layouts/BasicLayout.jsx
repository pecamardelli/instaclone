import React from "react";
import { Container } from "semantic-ui-react";

export default function BasicLayout(props) {
  const { children } = props;
  return (
    <>
      <h1>HEADER</h1>
      <Container>{children}</Container>
    </>
  );
}
