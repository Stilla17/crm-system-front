import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getCompanyEmployees,
  getEmployees,
  getSystemEmployees,
} from "src/service/employee.service";
import type { EmployeeListParams } from "src/types/employee.type";

export const useEmployees = (
  params: EmployeeListParams,
  enabled = true,
  companyId?: string,
) => {
  return useQuery({
    queryKey: ["employees", companyId ?? "current", "list", params],
    queryFn: () =>
      companyId ? getCompanyEmployees(companyId, params) : getEmployees(params),
    enabled,
    placeholderData: keepPreviousData,
    meta: {
      skipGlobalLoading: true,
    },
  });
};

export const useSystemEmployees = (
  params: EmployeeListParams,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["employees", "system", "list", params],
    queryFn: () => getSystemEmployees(params),
    enabled,
    placeholderData: keepPreviousData,
    meta: {
      skipGlobalLoading: true,
    },
  });
};
