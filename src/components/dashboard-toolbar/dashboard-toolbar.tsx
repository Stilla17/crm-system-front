"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { toolbarExcludedRoutes } from "src/data/dashboard-toolbar";

import { CompanyFilter } from "./company-filter";
import { useGetCompanies } from "src/hooks/companies/useGetCompanies";
import type { Company } from "src/types/company";
import CompanyEditModal from "./company-edit-modal";
import CompanyFormModal from "./company-form-modal";
import { useIsSuperAdmin } from "src/hooks/useIsSuperAdmin";
import FilterDate from "./filter-date";

export function DashboardToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [companyToEdit, setCompanyToEdit] = useState<Company | null>(null);
  const isSuperAdmin = useIsSuperAdmin();
  const isExcluded = toolbarExcludedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const companyId = searchParams.get("companyId") ?? "all";

  const { data: apiCompanies = [] } = useGetCompanies(
    isSuperAdmin && !isExcluded,
  );

  const companies = [
    { id: "all", label: "Hammasi" },
    ...apiCompanies.map((company) => ({
      id: company.id,
      label: company.companyName,
      brandColor: company.brandColor,
      status: company.status,
    })),
  ];

  if (isExcluded || !isSuperAdmin) return null;

  const handleCompanyChange = (selectedCompanyId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCompanyId === "all") {
      params.delete("companyId");
    } else {
      params.set("companyId", selectedCompanyId);
    }

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="space-y-3 px-6 pb-4">
      <section
        aria-label="Kompaniya filtri"
        className="flex min-h-12.5 items-center gap-3 overflow-x-auto rounded-[14px] border border-[#dfe2e7] bg-white p-1.5"
      >
        <CompanyFilter
          companies={companies}
          value={companyId}
          onChange={handleCompanyChange}
          onEdit={(id) => {
            const selectedCompany = apiCompanies.find(
              (company) => company.id === id,
            );

            setCompanyToEdit(selectedCompany ?? null);
          }}
        />

        <CompanyFormModal />
      </section>
      <FilterDate />

      {companyToEdit && (
        <CompanyEditModal
          company={companyToEdit}
          open
          onClose={() => setCompanyToEdit(null)}
        />
      )}
    </div>
  );
}
