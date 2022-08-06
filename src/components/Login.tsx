import { useState } from "react";
import "./Login.css";

const Login = () => {
  const renderErrorMessage = (message: string | null | undefined) => (
    <div className="error">{message}</div>
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { userName, password } = document.forms[0];
    const loginData = {
      login: userName.value,
      password: password.value,
    };
    //request
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="userName" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
        </div>
        {/* {renderErrorMessage(state.error?.Message)} */}
        <div className="button-container">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="login-form-conteiner">
      <div className="login-form">
        <div className="title">Sign In</div>
        {false ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
};

export default Login;
