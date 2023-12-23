import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default LoginButton;
