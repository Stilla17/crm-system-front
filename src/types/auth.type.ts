export interface User {
  id: string;
  login: string;
  permissions: string[];
  name: string;
  roleName: string;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
