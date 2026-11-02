import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  moveEmployeeToCompany,
  updateEmployee,
} from "src/service/employee.service";
import type { UpdateEmployeePayload } from "src/types/employee.type";

type UpdateEmployeeInput = {
  employeeId: string;
  data: UpdateEmployeePayload;
  targetCompanyId?: string;
};

export const useUpdateEmployee = (companyId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      employeeId,
      data,
      targetCompanyId,
    }: UpdateEmployeeInput) => {
      const updatedEmployee = await updateEmployee(
        employeeId,
        data,
        companyId,
      );

      if (
        companyId &&
        targetCompanyId &&
        targetCompanyId !== companyId
      ) {
        return moveEmployeeToCompany(
          employeeId,
          companyId,
          targetCompanyId,
        );
      }

      return updatedEmployee;
    },
    onSuccess: (employee) => {
      queryClient.setQueryData(
        ["employees", employee.companyId ?? companyId ?? "current", employee.id],
        employee,
      );
      void queryClient.invalidateQueries({ queryKey: ["employees"] });
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
