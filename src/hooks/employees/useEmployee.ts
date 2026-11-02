import { useQuery } from "@tanstack/react-query";
import {
  getCompanyEmployee,
  getEmployee,
} from "src/service/employee.service";

export const useEmployee = (employeeId: string, companyId?: string | null) => {
  return useQuery({
    queryKey: ["employees", companyId ?? "current", employeeId],
    queryFn: () =>
      companyId
        ? getCompanyEmployee(companyId, employeeId)
        : getEmployee(employeeId),
    enabled: Boolean(employeeId),
  });
};
