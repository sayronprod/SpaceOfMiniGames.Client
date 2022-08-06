import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../app/hooks";
import { BaseApiUrl } from "../global";
import "./Login.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [tokenData, setTokenData] = useLocalStorage("token", null);
  let navigate = useNavigate();

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
    fetch(`${BaseApiUrl}/Token`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.token != null) {
          const tokenInfo = data as TokenInfo;
          setTokenData(tokenInfo);
          window.dispatchEvent(new Event("storage"));
          navigate("/");
        } else {
          const error: ApiError = data as ApiError;
          setErrorMessage(error.message!);
        }
      });
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
        {renderErrorMessage(errorMessage)}
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
