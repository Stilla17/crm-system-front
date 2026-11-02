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

export type CreateUserPayload = Omit<EmployeeFormValues, "companyId">;

export type EmployeeGender = "M" | "F";

export type EmployeeSyncStatus = "pending" | "syncing" | "synced" | "failed";

export type CreateEmployeeRecordPayload = {
  userId?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  gender: EmployeeGender;
  phone?: string;
  birthDate?: string;
  jobId?: string;
  divisionId?: string;
  locationIds?: string[];
};

export type UpdateEmployeePayload = Partial<
  Omit<CreateEmployeeRecordPayload, "userId">
> & {
  roleId?: string;
};

export type CreateEmployeeAccountPayload = {
  login: string;
  password: string;
  roleId: string;
};

export type EmployeeRecord = {
  id: string;
  companyId: string;
  userId?: string | null;
  verifixEmployeeId?: string | null;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: EmployeeGender;
  phone?: string;
  birthDate?: string;
  jobId?: string;
  divisionId?: string;
  locationIds?: string[];
  source?: "crm" | "verifix";
  user?: {
    id: string;
    login: string;
    name: string;
    middleName: string;
    phone: string;
    date?: string;
    roleId?: string;
    status?: "active" | "inactive";
  } | null;
  syncStatus: EmployeeSyncStatus;
  syncError?: string | null;
  lastSyncedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ImportVerifixEmployeesResult = {
  received: number;
  created: number;
  updated: number;
  linkedToUsers: number;
  skipped: number;
};

export type EmployeeListParams = {
  page: number;
  limit: number;
  search?: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type EmployeeListResponse = {
  items: EmployeeRecord[];
  meta: PaginationMeta;
};
