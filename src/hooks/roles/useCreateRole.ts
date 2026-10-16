import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole } from "src/service/role.service";
import type { CreateRoleType, Role } from "src/types/role.type";

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleType) => createRole(data),
    onSuccess: (createdRole) => {
      queryClient.setQueryData<Role[]>(["roles"], (currentRoles = []) => [
        createdRole,
        ...currentRoles.filter((role) => role.id !== createdRole.id),
      ]);

      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};
