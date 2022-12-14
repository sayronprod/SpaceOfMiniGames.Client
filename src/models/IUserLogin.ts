interface IUserLoginRequest {
  login: string;
  password: string;
}

interface IUserLoginResponse extends IApiResponse {
  token: string;
  expired: string;
  userInfo: IUserInfo;
}
