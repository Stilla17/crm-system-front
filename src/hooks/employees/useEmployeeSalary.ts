import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getEmployeeSalary } from "src/service/employee.service";
import type { EmployeeSalaryParams } from "src/types/salary.type";

export const useEmployeeSalary = (
  employeeId: string,
  params: EmployeeSalaryParams,
  companyId?: string,
) => {
  return useQuery({
    queryKey: [
      "employees",
      companyId ?? "current",
      employeeId,
      "salary",
      params,
    ],
    queryFn: () => getEmployeeSalary(employeeId, params, companyId),
    enabled: Boolean(employeeId),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    meta: {
      skipGlobalLoading: true,
    },
  });
};
