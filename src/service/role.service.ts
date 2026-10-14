import { api } from "src/lib/api";
import { Role } from "src/types/role.type";

export const getCompanyRoles = async (companyId: string): Promise<Role[]> => {
  const response = await api.get<Role[]>(`/companies/${companyId}/roles`);

  return response.data;
};

export const getSystemRoles = async (): Promise<Role[]> => {
  const response = await api.get<Role[]>("/system/roles");

  return response.data;
};
