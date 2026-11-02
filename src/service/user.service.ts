import { api } from "src/lib/api";
import type { User } from "src/types/auth.type";
import type { CreateUserPayload } from "src/types/employee.type";

// Super Admin uchun hammasi;
export const getSystemUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/system/users");

  return response.data;
};

// oddiy HR kompaniyasining xodimlari;
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");

  return response.data;
};

export const createUser = async (
  data: CreateUserPayload,
): Promise<User> => {
  const response = await api.post<User>("/users", data);

  return response.data;
};

export const createCompanyUser = async (
  companyId: string,
  data: CreateUserPayload,
): Promise<User> => {
  const response = await api.post<User>(`/companies/${companyId}/users`, data);

  return response.data;
};

// tanlangan kompaniya xodimlari.
export const getCompanyUsers = async (companyId: string): Promise<User[]> => {
  const response = await api.get<User[]>(`/companies/${companyId}/users`);

  return response.data;
};
