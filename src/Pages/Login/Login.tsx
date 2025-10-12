import "./Login.css";
import { type JSX } from "react";
import { SignedOut, SignIn } from "@clerk/clerk-react";

function Login(): JSX.Element {
  return (
    <>
      <h2>Login</h2>
      <SignedOut>
        <SignIn forceRedirectUrl="https://henrivanderstelt.github.io/schema-app-test/dashboard" />
      </SignedOut>
    </>
  );
}

export default Login;
