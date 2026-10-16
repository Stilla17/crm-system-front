export type EmployeeFormValues = {
  companyId: string;
  roleId: string;
  name: string;
  middleName: string;
  phone: string;
  date: string;
  login: string;
  password: string;
};

export type CreateEmployeePayload = Omit<EmployeeFormValues, "companyId">;

