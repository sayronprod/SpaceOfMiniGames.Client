import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import "./Login.css";
import { useAppDispatch } from "./../../hooks/redux";
import { loginUser } from "./../../store/actions/token";
import { useEffect } from "react";

const Login = () => {
  const { userToken, error, isLoading } = useAppSelector(
    (state) => state.tokenReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { userName, password } = document.forms[0];
    const loginData = {
      login: userName.value,
      password: password.value,
    };
    dispatch(loginUser(loginData.login, loginData.password));
  };

  useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  });

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
        {error ?? <div className="error">{error}</div>}
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
