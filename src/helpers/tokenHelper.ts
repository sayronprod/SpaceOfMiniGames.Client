export const checkToken = (tokenInfo: ITokenInfo | null) => {
  let result: boolean = false;
  if (
    tokenInfo != null &&
    Date.parse(tokenInfo.expired) > new Date().valueOf() &&
    tokenInfo.token
  ) {
    result = true;
  }
  return result;
};
