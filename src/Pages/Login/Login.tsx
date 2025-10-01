import "./Login.css";

import { type JSX } from "react";

function Login(): JSX.Element {
  return (
    <>
      <h1>Login</h1>
      <p>
        <i>Please log in to access your workout data.</i>
      </p>
      <form>
        <label>Email:</label>
        <input type="email" placeholder="Enter your email" />
        <br />
        <label>Password:</label>
        <input type="password" placeholder="Enter your password" />
        <br />
        <button
          onClick={() => {
            window.location.href = "/schema-app-test/dashboard";
          }}
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
