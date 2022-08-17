interface IUserLoginRequest {
  login: string;
  password: string;
}

interface IUserLoginResponse extends IApiResponse {
  login: string;
  password: string;
  token: string;
  expired: string;
  userInfo: IUserInfo;
}
