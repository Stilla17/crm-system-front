export interface User {
  id: string;
  login: string;
  permissions: string[];
  name: string;
}

export interface LoginData {
  login: string;
  password: string;
}
