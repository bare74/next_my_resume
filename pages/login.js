import React from "react";
import auth from "../utils/auth0";

const LoginPage = () => {
  const handleLogin = () => {
    auth.login();
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
