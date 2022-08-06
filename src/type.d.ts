interface UserLoginData {
  login: string;
  password: string;
}

interface TokenInfo {
  token: string | null;
  expired: string | null;
}

interface ApiError {
  message: string | null;
}
