"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import {
  companies,
  periods,
  toolbarExcludedRoutes,
} from "src/data/dashboard-toolbar";

import { CompanyFilter } from "./company-filter";
import { PeriodFilter } from "./period-filter";

export function DashboardToolbar() {
  const pathname = usePathname();
  const [companyId, setCompanyId] = useState("all");
  const [periodId, setPeriodId] = useState("2026-09");

  const isExcluded = toolbarExcludedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isExcluded) return null;

  return (
    <div className="space-y-3 px-6 pb-4">
      <section
        aria-label="Kompaniya filtri"
        className="flex min-h-[50px] items-center gap-3 overflow-x-auto rounded-[14px] border border-[#dfe2e7] bg-white p-1.5"
      >
        <CompanyFilter
          companies={companies}
          value={companyId}
          onChange={setCompanyId}
        />
        <button
          type="button"
          className="h-9 shrink-0 cursor-pointer rounded-[10px] border border-dashed border-[#d4dae3] px-3 text-[13px] text-[#315487] transition-colors hover:border-[#2467d1] hover:bg-[#f7f9fc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2467d1]"
        >
          + Yangi kompaniya
        </button>
      </section>

      <section
        aria-label="Sana filtri"
        className="overflow-x-auto rounded-[14px] border border-[#dfe2e7] bg-white px-3.5 py-2.5"
      >
        <PeriodFilter
          periods={periods}
          value={periodId}
          onChange={setPeriodId}
        />
      </section>
    </div>
  );
}
