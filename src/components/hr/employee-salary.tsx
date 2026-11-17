"use client";

import { Banknote, CalendarDays, Clock3, Timer } from "lucide-react";
import { useMemo, useState } from "react";
import {
  MonthPicker,
  ProfileMetricGrid,
  ProfilePanelState,
  ProfileSectionHeader,
  type ProfileMetric,
} from "src/components/hr/employee-profile-ui";
import { useEmployeeSalary } from "src/hooks/employees/useEmployeeSalary";
import { getErrorMessage } from "src/lib/error";
import {
  formatDuration,
  formatMoney,
  formatMonth,
  getCurrentMonth,
  getMonthRange,
  getTabPanelProps,
} from "src/lib/employee-profile-formatters";

type EmployeeSalaryProps = {
  employeeId: string;
  companyId?: string;
  embedded?: boolean;
};

export function EmployeeSalary({
  employeeId,
  companyId,
  embedded = false,
}: EmployeeSalaryProps) {
  const [month, setMonth] = useState(getCurrentMonth);
  const params = useMemo(() => getMonthRange(month), [month]);
  const query = useEmployeeSalary(employeeId, params, companyId);
  const panelProps = getTabPanelProps("salary", embedded);

  if (query.isLoading) {
    return (
      <section {...panelProps} className="mt-4">
        <ProfilePanelState
          message="Ish haqi ma’lumotlari yuklanmoqda..."
          description="Verifix javobi bir daqiqagacha vaqt olishi mumkin"
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

  const salary = query.data;
  if (!salary) return null;

  const monthlyWage = salary.days.find(({ wage }) => wage > 0)?.wage ?? 0;
  const metrics: ProfileMetric[] = [
    {
      label: "Ishlangan kunlar",
      value: `${salary.summary.workedDays} kun`,
      note: "Interval mavjud kunlar",
      icon: CalendarDays,
      tone: "blue",
    },
    {
      label: "Ishlangan vaqt",
      value: formatDuration(salary.summary.turnoutTimeSeconds),
      note: `Reja: ${formatDuration(salary.summary.plannedTimeSeconds)}`,
      icon: Clock3,
      tone: "slate",
    },
    {
      label: "Qo‘shimcha ish",
      value: formatDuration(salary.summary.overtimeTimeSeconds),
      note: formatMoney(salary.summary.overtimeAmount),
      icon: Timer,
      tone: "orange",
    },
    {
      label: "Oylik haqi",
      value: formatMoney(monthlyWage),
      note: "Tanlangan oy bo‘yicha",
      icon: Banknote,
      tone: "green",
    },
  ];

  return (
    <section {...panelProps} className="mt-4 space-y-4">
      <ProfileSectionHeader
        icon={Banknote}
        title="Ish haqi"
        description="Verifix vaqt intervallari bo‘yicha hisob-kitob"
      >
        <MonthPicker
          value={month}
          onChange={setMonth}
          isFetching={query.isFetching}
        />
      </ProfileSectionHeader>

      <ProfileMetricGrid metrics={metrics} />

      <div className="grid overflow-hidden rounded-2xl border border-[#e0e3e9] bg-white lg:grid-cols-[minmax(280px,0.8fr)_1.7fr]">
        <div className="flex flex-col justify-between bg-gradient-to-br from-[#206b4c] to-[#174f3a] p-6 text-white">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/65">
              {formatMonth(month)}
            </p>
            <p className="mt-2 text-[13px] text-white/75">
              Belgilangan oylik stavka
            </p>
          </div>
          <div className="mt-8">
            <p className="text-[28px] font-bold tracking-[-0.04em]">
              {formatMoney(monthlyWage)}
            </p>
            {salary.staffId && (
              <p className="mt-2 font-mono text-[10px] text-white/55">
                Staff ID: {salary.staffId}
              </p>
            )}
          </div>
        </div>

        {salary.days.length === 0 ? (
          <div className="p-10 text-center">
            <Banknote
              aria-hidden="true"
              className="mx-auto size-6 text-[#a0a8b3]"
            />
            <p className="mt-3 text-sm font-medium text-[#596576]">
              Ish haqi ma’lumoti topilmadi
            </p>
            <p className="mt-1 text-[12px] text-[#8a94a2]">
              Tanlangan oyda Verifix hisob-kitobi mavjud emas
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 divide-x divide-y divide-[#edf0f3] sm:grid-cols-3">
            <SalaryDetail
              label="Ishlangan kun"
              value={`${salary.summary.workedDays} kun`}
            />
            <SalaryDetail
              label="Reja"
              value={formatDuration(salary.summary.plannedTimeSeconds)}
            />
            <SalaryDetail
              label="Ishlangan vaqt"
              value={formatDuration(salary.summary.turnoutTimeSeconds)}
            />
            <SalaryDetail
              label="Qo‘shimcha vaqt"
              value={formatDuration(salary.summary.overtimeTimeSeconds)}
            />
            <SalaryDetail
              label="Qo‘shimcha summa"
              value={formatMoney(salary.summary.overtimeAmount)}
              accent
            />
            <SalaryDetail
              label="Hisoblangan oy"
              value={formatMonth(month)}
              capitalize
            />
          </div>
        )}
      </div>

      <p className="rounded-xl border border-[#f0e1d3] bg-[#fff8f2] px-4 py-3 text-[11px] leading-5 text-[#8d633f]">
        Ushbu summa Verifix’ning vaqt intervallari bo‘yicha hisoblangan ish
        haqidir. Soliq, bonus va boshqa payslip ushlanmalari bu hisobotga
        kirmasligi mumkin.
      </p>
    </section>
  );
}

type SalaryDetailProps = {
  label: string;
  value: string;
  accent?: boolean;
  capitalize?: boolean;
};

function SalaryDetail({ label, value, accent, capitalize }: SalaryDetailProps) {
  return (
    <div className="min-h-24 p-4 sm:p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8a94a2]">
        {label}
      </p>
      <p
        className={`mt-2 text-[13px] font-semibold ${accent ? "text-[#b65b25]" : "text-[#303640]"} ${capitalize ? "capitalize" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
