import React from "react";
import { Container } from "react-bootstrap";
import { LoginForm } from "./Login.components";

export const Login: React.FC = () => {
  return (
    <Container
      style={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <div>
        <h1>Welcome to RequestPlanner</h1>
        <LoginForm />
      </div>
    </Container>
  );
};
