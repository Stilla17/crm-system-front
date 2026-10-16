import { api } from "src/lib/api";
import { CreateRoleType, Role } from "src/types/role.type";

export const getCompanyRoles = async (companyId: string): Promise<Role[]> => {
  const response = await api.get<Role[]>(`/companies/${companyId}/roles`);
  return response.data;
};

export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get<Role[]>("/roles");
  return response.data;
};

export const createRole = async (data: CreateRoleType): Promise<Role> => {
  const response = await api.post<Role>("/roles", data);
  return response.data;
};
