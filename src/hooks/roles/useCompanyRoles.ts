import { useQuery } from "@tanstack/react-query";
import { getCompanyRoles } from "src/service/role.service";
import { Role } from "src/types/role.type";

export const useCompanyRoles = (companyId: string | null) => {
  return useQuery<Role[]>({
    queryKey: ["company-roles", companyId],
    queryFn: () => getCompanyRoles(companyId!),
    enabled: Boolean(companyId),
  });
};
