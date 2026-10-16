import { api } from "src/lib/api";
import type { User } from "src/types/auth.type";
import type { CreateEmployeePayload } from "src/types/employee.type";

export const getSystemUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/system/users");

  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");

  return response.data;
};

export const createUser = async (
  data: CreateEmployeePayload,
): Promise<User> => {
  const response = await api.post<User>("/users", data);

  return response.data;
};

export const createCompanyUser = async (
  companyId: string,
  data: CreateEmployeePayload,
): Promise<User> => {
  const response = await api.post<User>(`/companies/${companyId}/users`, data);

  return response.data;
};
