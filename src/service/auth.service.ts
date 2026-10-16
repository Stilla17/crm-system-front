import { api } from "src/lib/api";
import type {
  AuthProfile,
  AuthResponse,
  LoginData,
} from "src/types/auth.type";

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);

  return response.data;
};

export const logout = async (): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/logout");

  return response.data;
};

export const getAuthProfile = async (): Promise<AuthProfile> => {
  const response = await api.get<AuthProfile>("/auth/profile");

  return response.data;
};
