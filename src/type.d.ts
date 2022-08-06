interface IUserLoginData {
  login: string;
  password: string;
}

interface ITokenInfo {
  Token: string | null;
  Expired: Date | null;
}

interface IError {
  Message: string | null;
}
