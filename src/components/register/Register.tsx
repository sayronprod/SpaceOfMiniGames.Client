import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { registerUser } from "../../store/actions/token";
import "./Register.css";

const Register = () => {
  const { userToken, error, isLoading } = useAppSelector(
    (state) => state.userReducer
  );

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userNameValidationError, setUserNameValidationError] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const [formValidationResult, setFormValidationResult] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(registerUser(userName, password));
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

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

    if (confirmPassword != "" && confirmPassword != password) {
      result = false;
      setPasswordConfirmError("Passwords do not match");
    } else if (confirmPassword == "") {
      result = false;
      setPasswordConfirmError("");
    } else {
      setPasswordConfirmError("");
    }

    setFormValidationResult(result);
  };

  useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  });

  useEffect(() => {
    validateForm();
  }, [userName, password, confirmPassword]);

  return (
    <div className="register-form-conteiner">
      <div className="form-title">Sign Up</div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input
              type="text"
              onChange={handleChangeUserName}
              value={userName}
              required
            />
            <div className="error">{userNameValidationError}</div>
          </div>

          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              onChange={handleChangePassword}
              value={password}
              required
            />
            <div className="error">{passwordValidationError}</div>
          </div>

          <div className="input-container">
            <label>Confirm Password </label>
            <input
              type="password"
              onChange={handleChangeConfirmPassword}
              value={confirmPassword}
              required
            />
            <div className="error">{passwordConfirmError}</div>
          </div>

          <div className="error">{error}</div>

          <div className="button-container">
            <input
              type="submit"
              value="Register"
              disabled={!formValidationResult}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
