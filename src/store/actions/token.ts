import axios from "axios";
import { BaseApiUrl } from "../../global";
import { AppDispatch } from "../store";
import { userSlice } from "../reducers/UserSlice";

export const loginUser =
  (login: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const body: IUserLoginRequest = {
        login,
        password,
      };
      dispatch(userSlice.actions.loginUserStarting());

      const response = await axios.post<IUserLoginResponse>(
        `${BaseApiUrl}/Token`,
        body
      );
      if (response.data.isSuccess) {
        dispatch(userSlice.actions.loginUserEnd(response.data));
      } else {
        dispatch(userSlice.actions.loginUserError(response.data.message));
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(userSlice.actions.loginUserError(e.message));
      } else {
        dispatch(
          userSlice.actions.loginUserError("An unexpected error occurred")
        );
        console.log(e);
      }
    }
  };

export const registerUser =
  (login: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const body: IUserRegisterRequest = {
        login,
        password,
      };
      dispatch(userSlice.actions.registerUserStarting());

      const response = await axios.post<IUserRegisterResponse>(
        `${BaseApiUrl}/User/Register`,
        body
      );
      if (response.data.isSuccess) {
        dispatch(userSlice.actions.registerUserEnd(response.data));
      } else {
        dispatch(userSlice.actions.registerUserError(response.data.message));
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(userSlice.actions.registerUserError(e.message));
      } else {
        dispatch(
          userSlice.actions.registerUserError("An unexpected error occurred")
        );
        console.log(e);
      }
    }
  };
