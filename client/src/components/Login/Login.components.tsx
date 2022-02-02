import React from "react";

import GithubButton from "react-github-login-button";
import { Link } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const githubUrl = `${process.env.REACT_APP_USERS_URL}/auth/github`;

  const githubLogin = () => window.open(githubUrl, "_self");

  return <GithubButton onClick={githubLogin} />;
};

export const LoginError: React.FC = () => {
  return (
    <div>
      <h3>Try again later:</h3>
      <Link to={"/login"}>Login page</Link>
    </div>
  );
};
