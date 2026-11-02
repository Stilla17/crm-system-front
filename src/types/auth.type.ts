export interface User {
  id: string;
  companyId?: string | null;
  date?: string;
  login: string;
  permissions: string[];
  name: string;
  phone: string;
  middleName: string;
  roleId?: string;
  roleName?: string;
  status?: "active" | "inactive";
}

export interface LoginData {
  companyId: string;
  login: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  company: {
    id: string;
    companyName: string;
  };
  employee: AuthProfile;
}

export interface AuthProfile {
  id: string;
  companyId: string | null;
  login: string;
  permissions: string[];
  roleId: string;
  roleName: string;
  roleScope: "system" | "company";
}
