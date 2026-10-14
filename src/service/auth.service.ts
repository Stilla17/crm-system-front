import { api } from "src/lib/api";
import { AuthTokens, LoginData, User } from "src/types/auth.type";

export const login = async (data: LoginData): Promise<AuthTokens> => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

export const getCurrentUser = async (): Promise<User[]> => {
  const response = await api.get("/system/users");
  return response.data;
};
