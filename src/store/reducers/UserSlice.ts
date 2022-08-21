import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userToken: ITokenInfo | null;
  userInfo: IUserInfo | null;
  isLoading: boolean;
  error: string | null;
}

let userTokenString = localStorage.getItem("userToken");
let userInfoString = localStorage.getItem("userInfo");
const persistedUserToken = userTokenString ? JSON.parse(userTokenString) : null;
const persistedInfoToken = userInfoString ? JSON.parse(userInfoString) : null;

const initialState: UserState = {
  userToken: persistedUserToken,
  userInfo: persistedInfoToken,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUserStarting(state) {
      state.isLoading = true;
    },
    loginUserEnd(state, action: PayloadAction<IUserLoginResponse>) {
      state.isLoading = false;
      const tokenInfo: ITokenInfo = {
        token: action.payload.token,
        expired: action.payload.expired,
      };
      state.userToken = tokenInfo;
      state.error = null;
      state.userInfo = action.payload.userInfo;
    },
    loginUserError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.userInfo = null;
    },
    clearToken(state) {
      state.userInfo = null;
      state.userToken = null;
    },
    registerUserStarting(state) {
      state.isLoading = true;
    },
    registerUserEnd(state, action: PayloadAction<IUserRegisterResponse>) {
      state.isLoading = false;
      const tokenInfo: ITokenInfo = {
        token: action.payload.token,
        expired: action.payload.expired,
      };
      state.userToken = tokenInfo;
      state.error = null;
      state.userInfo = action.payload.userInfo;
    },
    registerUserError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.userInfo = null;
    },
  },
});

export default userSlice.reducer;
