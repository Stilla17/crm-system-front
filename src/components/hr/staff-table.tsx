"use client";

import { EmployeesTable } from "./employees-table";
import { useAuthProfile } from "src/hooks/users/useAuthProfile";
import { useSearchParams } from "next/navigation";

export function StaffTable() {
  const { data: profile, isLoading } = useAuthProfile();
  const searchParams = useSearchParams();

  if (isLoading || !profile) {
    return (
      <div className="rounded-[17px] border border-[#e0e3e9] bg-white p-8 text-center text-sm text-[#748093]">
        Xodimlar yuklanmoqda...
      </div>
    );
  }

  // agar super admin bolib kirsa malumotlar chiqishiga ruxsat
  const isSuperAdmin =
    profile.roleScope === "system" && profile.companyId === null;

  const selectedCompanyId = searchParams.get("companyId");

  // return isSuperAdmin ? <UsersTable /> : <EmployeesTable />;
  return (
    <EmployeesTable
      key={`${isSuperAdmin ? "system" : "company"}:${selectedCompanyId ?? "current"}`}
      companyId={selectedCompanyId ?? undefined}
      isSuperAdmin={isSuperAdmin}
    />
  );
}
