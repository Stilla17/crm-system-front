import { useQuery } from "@tanstack/react-query";
import { getSystemRoles } from "src/service/role.service";
import type { Role } from "src/types/role.type";

export const useSystemRoles = () => {
  return useQuery<Role[]>({
    queryKey: ["system-roles"],
    queryFn: getSystemRoles,
  });
};
