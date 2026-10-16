import { useQuery } from "@tanstack/react-query";
import { getRoles } from "src/service/role.service";
import type { Role } from "src/types/role.type";

export const useGetRoles = () => {
  return useQuery<Role[]>({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
};
