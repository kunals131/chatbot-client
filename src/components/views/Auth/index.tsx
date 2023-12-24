import React from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { AuthView } from "./Auth.types";

const AuthPage = () => {
  const [authView, setAuthView] = React.useState<AuthView>(AuthView.LOGIN);
  return (
    <div className="flex w-full h-screen bg-secondaryBg items-center justify-center">
      <div className="w-[600px]">
        {authView === AuthView.LOGIN ? (
          <LoginForm setAuthView={setAuthView} />
        ) : (
          <RegisterForm setAuthView={setAuthView} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
