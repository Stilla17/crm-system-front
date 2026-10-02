import { api } from "src/lib/api";
import { LoginData, User } from "src/types/auth.type";

export const login = async (data: LoginData): Promise<User> => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const logout = async () => {};
