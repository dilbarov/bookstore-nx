export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
  fingerprint: string;
}

export interface ILogoutPayload {
  id: string;
  fingerprint: string;
}

export interface IRefreshTokensPayload {
  refreshToken: string;
  fingerprint: string;
}
