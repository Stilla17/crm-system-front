import { api } from "src/lib/api";
import type {
  CreateEmployeeRecordPayload,
  EmployeeListParams,
  EmployeeListResponse,
  EmployeeRecord,
  ImportVerifixEmployeesResult,
  UpdateEmployeePayload,
} from "src/types/employee.type";
import type {
  EmployeeAttendanceParams,
  EmployeeAttendanceResponse,
} from "src/types/attendance.type";
import {
  EmployeeSalaryParams,
  EmployeeSalaryResponse,
} from "src/types/salary.type";

export const getEmployees = async (
  params: EmployeeListParams,
): Promise<EmployeeListResponse> => {
  const response = await api.get<EmployeeListResponse>("/employees", {
    params,
  });
  return response.data;
};

export const getCompanyEmployees = async (
  companyId: string,
  params: EmployeeListParams,
): Promise<EmployeeListResponse> => {
  const response = await api.get<EmployeeListResponse>(
    `/companies/${companyId}/employees`,
    { params },
  );
  return response.data;
};

export const getEmployee = async (
  employeeId: string,
): Promise<EmployeeRecord> => {
  const response = await api.get<EmployeeRecord>(`/employees/${employeeId}`);
  return response.data;
};

export const getCompanyEmployee = async (
  companyId: string,
  employeeId: string,
): Promise<EmployeeRecord> => {
  const response = await api.get<EmployeeRecord>(
    `/companies/${companyId}/employees/${employeeId}`,
  );
  return response.data;
};

export const getEmployeeAttendance = async (
  employeeId: string,
  params: EmployeeAttendanceParams,
  companyId?: string,
): Promise<EmployeeAttendanceResponse> => {
  const path = companyId
    ? `/companies/${companyId}/employees/${employeeId}/attendance`
    : `/employees/${employeeId}/attendance`;
  const response = await api.get<EmployeeAttendanceResponse>(path, { params });

  return response.data;
};

export const updateEmployee = async (
  employeeId: string,
  data: UpdateEmployeePayload,
  companyId?: string,
): Promise<EmployeeRecord> => {
  const path = companyId
    ? `/companies/${companyId}/employees/${employeeId}`
    : `/employees/${employeeId}`;
  const response = await api.patch<EmployeeRecord>(path, data);
  return response.data;
};

export const moveEmployeeToCompany = async (
  employeeId: string,
  sourceCompanyId: string,
  targetCompanyId: string,
): Promise<EmployeeRecord> => {
  const response = await api.patch<EmployeeRecord>(
    `/companies/${sourceCompanyId}/employees/${employeeId}/company`,
    { targetCompanyId },
  );
  return response.data;
};

export const createEmployee = async (
  data: CreateEmployeeRecordPayload,
): Promise<EmployeeRecord> => {
  const response = await api.post<EmployeeRecord>("/employees", data);
  return response.data;
};

export const retryEmployeeSync = async (
  employeeId: string,
  companyId?: string,
): Promise<EmployeeRecord> => {
  const path = companyId
    ? `/companies/${companyId}/employees/${employeeId}/sync`
    : `/employees/${employeeId}/sync`;
  const response = await api.post<EmployeeRecord>(path);

  return response.data;
};

export const importEmployeesFromVerifix = async (companyId?: string) => {
  const path = companyId
    ? `/companies/${companyId}/employees/import/verifix`
    : "/employees/import/verifix";
  const response = await api.post<ImportVerifixEmployeesResult>(path);

  return response.data;
};

export const getSystemEmployees = async (
  params: EmployeeListParams,
): Promise<EmployeeListResponse> => {
  const response = await api.get<EmployeeListResponse>("/system/employees", {
    params,
  });
  return response.data;
};

export const getEmployeeSalary = async (
  employeeId: string,
  params: EmployeeSalaryParams,
  companyId?: string,
): Promise<EmployeeSalaryResponse> => {
  const path = companyId
    ? `/companies/${companyId}/employees/${employeeId}/salary`
    : `/employees/${employeeId}/salary`;

  const response = await api.get<EmployeeSalaryResponse>(path, {
    params,
    timeout: 100_000,
  });

  return response.data;
};
