export type SalaryInterval = {
  inputId: string | null;
  inputLocationId: string | null;
  inputLocationName: string | null;
  inputTime: string | null;
  outputId: string | null;
  outputLocationId: string | null;
  outputLocationName: string | null;
  outputTime: string | null;
  turnoutTimeSeconds: number;
  wageAmount: number;
  overtimeTimeSeconds: number;
  overtimeAmount: number;
};

export type SalaryDay = {
  date: string;
  jobId: string | null;
  planTimeSeconds: number;
  dayKind: string | null;
  dayKindName: string | null;
  wage: number;
  intervals: SalaryInterval[];
};

export type SalarySummary = {
  totalWage: number;
  plannedTimeSeconds: number;
  turnoutTimeSeconds: number;
  overtimeTimeSeconds: number;
  overtimeAmount: number;
  workedDays: number;
};

export type EmployeeSalaryResponse = {
  period: {
    from: string;
    to: string;
  };
  staffId: string | null;
  summary: SalarySummary;
  days: SalaryDay[];
};

export type EmployeeSalaryParams = {
  from: string;
  to: string;
};
