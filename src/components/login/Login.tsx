import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import "./Login.css";
import { useAppDispatch } from "./../../hooks/redux";
import { loginUser } from "./../../store/actions/token";
import { useEffect, useState } from "react";

const Login = () => {
  const { userToken, error, isLoading } = useAppSelector(
    (state) => state.userReducer
  );

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [userNameValidationError, setUserNameValidationError] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState("");

  const [formValidationResult, setFormValidationResult] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUser(userName, password));
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  });

  useEffect(() => {
    const validateForm = () => {
      let result = true;

      if (userName.length > 50) {
        result = false;
        setUserNameValidationError("Max lenght 50");
      } else if (userName.length < 1) {
        result = false;
      } else {
        setUserNameValidationError("");
      }

      if (password.length > 50) {
        result = false;
        setPasswordValidationError("Max lenght 50");
      } else if (password.length < 1) {
        result = false;
      } else {
        setPasswordValidationError("");
      }

      setFormValidationResult(result);
    };
    validateForm();
  }, [userName, password]);

  return (
    <div className="login-form-conteiner">
      <div className="form-title">Sign In</div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input
              type="text"
              value={userName}
              required
              onChange={handleChangeUserName}
            />
            <div className="error">{userNameValidationError}</div>
          </div>

          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              value={password}
              required
              onChange={handleChangePassword}
            />
            <div className="error">{passwordValidationError}</div>
          </div>

          <div className="error">{error}</div>

          <div className="button-container">
            <input
              type="submit"
              value="Login"
              disabled={!formValidationResult}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
