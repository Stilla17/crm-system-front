import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getEmployeeAttendance } from "src/service/employee.service";
import type {
  EmployeeAttendanceParams,
  EmployeeAttendanceResponse,
} from "src/types/attendance.type";

const ACTIVE_SHIFT_REFRESH_INTERVAL = 60_000;

const getTashkentDate = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

const hasOpenShiftToday = (
  attendance: EmployeeAttendanceResponse | undefined,
  params: EmployeeAttendanceParams,
) => {
  const today = getTashkentDate();
  if (today < params.from || today > params.to) return false;

  const todayRecord = attendance?.items.find((item) => item.date === today);

  return Boolean(todayRecord?.checkInAt && !todayRecord.checkOutAt);
};

export const useEmployeeAttendance = (
  employeeId: string,
  params: EmployeeAttendanceParams,
  companyId?: string,
) => {
  return useQuery({
    queryKey: [
      "employees",
      companyId ?? "current",
      employeeId,
      "attendance",
      params,
    ],
    queryFn: () => getEmployeeAttendance(employeeId, params, companyId),
    enabled: Boolean(employeeId),
    placeholderData: keepPreviousData,
    refetchInterval: (query) =>
      hasOpenShiftToday(query.state.data, params)
        ? ACTIVE_SHIFT_REFRESH_INTERVAL
        : false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: "always",
    refetchOnReconnect: "always",
    staleTime: 30_000,
    meta: {
      skipGlobalLoading: true,
    },
  });
};
