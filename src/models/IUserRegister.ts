interface IUserRegisterRequest {
  login: string;
  password: string;
}

interface IUserRegisterResponse extends IApiResponse {
  token: string;
  expired: string;
  userInfo: IUserInfo;
}
