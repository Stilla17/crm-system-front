"use client";

import { LogIn, LogOut } from "lucide-react";
import { useMemo, useState } from "react";
import { ProfilePanelState } from "src/components/hr/employee-profile-ui";
import { useEmployeeAttendance } from "src/hooks/employees/useEmployeeAttendance";
import { getErrorMessage } from "src/lib/error";
import {
  formatDayDate,
  formatTime,
  getCurrentMonth,
  getMonthRange,
  getRecentDayRange,
  getTabPanelProps,
} from "src/lib/employee-profile-formatters";
import type { AttendanceRecord } from "src/types/attendance.type";

type EmployeeAttendanceProps = {
  employeeId: string;
  companyId?: string;
  embedded?: boolean;
};

const getStatus = (record: AttendanceRecord) => {
  if (record.checkInAt && record.checkOutAt) {
    return { label: "Yakunlangan", className: "bg-[#e9f7ef] text-[#24704e]" };
  }
  if (record.checkInAt) {
    return { label: "Ishda", className: "bg-[#eef2ff] text-[#5267ad]" };
  }
  return {
    label: "Kirish topilmadi",
    className: "bg-[#fff3e9] text-[#a85b28]",
  };
};

export function EmployeeAttendance({
  employeeId,
  companyId,
  embedded = false,
}: EmployeeAttendanceProps) {
  const [month] = useState(getCurrentMonth);
  const params = useMemo(
    () => (embedded ? getRecentDayRange() : getMonthRange(month)),
    [embedded, month],
  );
  const query = useEmployeeAttendance(employeeId, params, companyId);
  const panelProps = getTabPanelProps("attendance", embedded);

  if (query.isLoading) {
    return (
      <section {...panelProps} className="mt-4">
        <ProfilePanelState
          message="Davomat ma’lumotlari yuklanmoqda..."
          loading
        />
      </section>
    );
  }

  if (query.isError) {
    return (
      <section {...panelProps} className="mt-4">
        <ProfilePanelState
          message={getErrorMessage(query.error)}
          error
          onRetry={() => void query.refetch()}
        />
      </section>
    );
  }

  const attendance = query.data;
  if (!attendance) return null;

  return (
    <section {...panelProps} className="mt-4 space-y-4">
      <div className="overflow-hidden rounded-2xl border border-[#e0e3e9] bg-white">
        <div className="flex items-center justify-between border-b border-[#e9ecf0] px-4 py-4 sm:px-5">
          <div>
            <h3 className="text-[14px] font-semibold text-[#20252c]">
              Kunlik davomat
            </h3>
            <p className="mt-0.5 text-[11px] text-[#8a94a2]">
              {embedded
                ? "Bugun va kechagi kun bo‘yicha ma’lumotlar"
                : "Tanlangan oy bo‘yicha ma’lumotlar"}
            </p>
          </div>
          <span className="rounded-full bg-[#f1f3f6] px-2.5 py-1 text-[10px] font-medium text-[#667283]">
            {attendance.items.length} kun
          </span>
        </div>

        {attendance.items.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#748093]">
            {embedded
              ? "Bugun va kechagi kun uchun davomat ma’lumoti topilmadi."
              : "Tanlangan oy uchun davomat ma’lumoti topilmadi."}
          </div>
        ) : embedded ? (
          <div className="grid gap-3 p-3 sm:grid-cols-2">
            {attendance.items.map((record) => {
              const status = getStatus(record);

              return (
                <article
                  key={record.date}
                  className="rounded-xl border border-[#e7eaee] bg-[#fafbfc] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[12px] font-semibold text-[#303640]">
                      {formatDayDate(record.date)}
                    </p>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[#e7eaee] pt-3">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.05em] text-[#8a94a2]">
                        Kelgan
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#303640]">
                        <LogIn
                          aria-hidden="true"
                          className="size-3.5 text-[#2e7a59]"
                        />
                        {formatTime(record.checkInAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.05em] text-[#8a94a2]">
                        Ketgan
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-[12px] text-[#667283]">
                        <LogOut
                          aria-hidden="true"
                          className="size-3.5 text-[#8a94a2]"
                        />
                        {formatTime(record.checkOutAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.05em] text-[#8a94a2]">
                        Qaydlar
                      </p>
                      <p className="mt-1 text-[12px] font-medium text-[#667283]">
                        {record.trackCount} ta
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 border-collapse text-[12px]">
              <thead className="bg-[#f8f9fb] text-left text-[10px] font-semibold uppercase tracking-[0.06em] text-[#808b9b]">
                <tr>
                  <th className="px-4 py-3">Sana</th>
                  <th className="px-4 py-3">Kelgan vaqt</th>
                  <th className="px-4 py-3">Ketgan vaqt</th>
                  <th className="px-4 py-3">Qaydlar</th>
                  <th className="px-4 py-3 text-right">Holat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf0f3]">
                {attendance.items.map((record) => {
                  const status = getStatus(record);
                  return (
                    <tr
                      key={record.date}
                      className="transition-colors hover:bg-[#fafbfc]"
                    >
                      <td className="px-4 py-3 font-medium text-[#303640]">
                        {formatDayDate(record.date)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-[#303640]">
                          <LogIn
                            aria-hidden="true"
                            className="size-3.5 text-[#2e7a59]"
                          />
                          {formatTime(record.checkInAt)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 text-[#667283]">
                          <LogOut
                            aria-hidden="true"
                            className="size-3.5 text-[#8a94a2]"
                          />
                          {formatTime(record.checkOutAt)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#667283]">
                        {record.trackCount} ta
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
