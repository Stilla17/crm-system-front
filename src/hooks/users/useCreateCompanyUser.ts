import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompanyUser } from "src/service/user.service";
import type { EmployeeFormValues } from "src/types/employee.type";

export const useCreateCompanyUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, ...data }: EmployeeFormValues) =>
      createCompanyUser(companyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["system-users"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};
