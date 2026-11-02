import { useMutation, useQueryClient } from "@tanstack/react-query";
import { importEmployeesFromVerifix } from "src/service/employee.service";

export const useImportVerifixEmployees = (companyId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => importEmployeesFromVerifix(companyId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["employees"] });
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
