"use client";

import { usePathname } from "next/navigation";
import { getCompanyOverviewContent } from "src/data/company-overview-content";
import {
  companySummaries,
  companySummaryExcludedRoutes,
} from "src/data/company-summaries";
import { CompanyCard } from "./company-card";

export function CompanyOverview() {
  const pathname = usePathname();
  const content = getCompanyOverviewContent(pathname);
  const isExcluded = companySummaryExcludedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isExcluded) return null;

  return (
    <div className="px-6 pb-4">
      <section
        aria-labelledby="company-overview-title"
        className="rounded-[17px] border border-[#e0e3e9] bg-white p-[18px]"
      >
        <h2
          id="company-overview-title"
          className="text-[15px] font-semibold leading-5 text-[#15191f]"
        >
          {content.title}
        </h2>
        <p className="mt-1 max-w-[510px] text-[13px] leading-[18px] text-[#66748a]">
          {content.description}
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-4">
          {companySummaries.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>
    </div>
  );
}
