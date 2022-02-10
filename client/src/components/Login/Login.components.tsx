import React from "react";
import { Card, Container } from "react-bootstrap";

import GithubButton from "react-github-login-button";
import { Link } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const githubUrl = `${process.env.REACT_APP_USERS_URL}/auth/github`;

  const githubLogin = () => window.open(githubUrl, "_self");

  return <GithubButton onClick={githubLogin} />;
};

export const LoginError: React.FC = () => {
  return (
    <Container className=" mt-2 d-flex justify-content-center">
      <Card style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h3>Something went wrong</h3>
          <p>Try again later:</p>
          <Link style={{ textDecoration: "none" }} to={"/login"}>
            Login page
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};
