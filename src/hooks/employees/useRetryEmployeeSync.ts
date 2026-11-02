import { useMutation, useQueryClient } from "@tanstack/react-query";
import { retryEmployeeSync } from "src/service/employee.service";

export const useRetryEmployeeSync = (companyId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (employeeId: string) =>
      retryEmployeeSync(employeeId, companyId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
