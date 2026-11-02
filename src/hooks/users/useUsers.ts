import { useQuery } from "@tanstack/react-query";
import {
  getSystemUsers,
  getUsers,
  getCompanyUsers,
} from "src/service/user.service";

type UseUsersParams = {
  isSuperAdmin: boolean;
  companyId: string;
  enabled?: boolean;
};

export const useSystemUsers = () => {
  return useQuery({
    queryKey: ["system-users"],
    queryFn: getSystemUsers,
  });
};

export const useUsers = ({
  isSuperAdmin,
  companyId,
  enabled = true,
}: UseUsersParams) => {
  return useQuery({
    queryKey: ["users", isSuperAdmin ? "system" : "company", companyId],
    queryFn: () => {
      if (!isSuperAdmin) {
        return getUsers();
      }

      if (companyId === "all") {
        return getSystemUsers();
      }

      return getCompanyUsers(companyId);
    },
    enabled,
  });
};
