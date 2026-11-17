export type AttendanceRecord = {
  date: string;
  checkInAt: string | null;
  checkOutAt: string | null;
  trackCount: number;
};

export type AttendanceSummary = {
  recordedDays: number;
  daysWithCheckIn: number;
  totalTrackEvents: number;
};

export type EmployeeAttendanceResponse = {
  period: {
    from: string;
    to: string;
  };
  summary: AttendanceSummary;
  items: AttendanceRecord[];
};

export type EmployeeAttendanceParams = {
  from: string;
  to: string;
};
