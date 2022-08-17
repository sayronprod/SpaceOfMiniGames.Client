import axios from "axios";
import { BaseApiUrl } from "../../global";
import { AppDispatch } from "../store";
import { tokenSlice } from "./../reducers/TokenSlice";

export const loginUser =
  (login: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const body: IUserLoginRequest = {
        login,
        password,
      };
      dispatch(tokenSlice.actions.loginUserStarting());

      const response = await axios.post<IUserLoginResponse>(
        `${BaseApiUrl}/Token`,
        body
      );
      if (response.data.isSuccess) {
        dispatch(tokenSlice.actions.loginUserEnd(response.data));
      } else {
        dispatch(tokenSlice.actions.loginUserError(response.data.message));
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(tokenSlice.actions.loginUserError(e.message));
      } else {
        dispatch(
          tokenSlice.actions.loginUserError("An unexpected error occurred")
        );
        console.log(e);
      }
    }
  };
