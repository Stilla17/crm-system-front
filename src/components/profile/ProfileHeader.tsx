"use client";

import { Edit3, RefreshCw } from "lucide-react";
import { useState } from "react";
import { profileTabs } from "src/data/employee";
import type { EmployeeRecord } from "src/types/employee.type";

type ProfileHeaderProps = {
  employee: Pick<EmployeeRecord, "firstName" | "lastName" | "middleName" | "companyId" | "user"> &
    Partial<Pick<EmployeeRecord, "syncStatus" | "verifixEmployeeId">>;
  roleName: string;
  companyName?: string | null;
  activeTab?: (typeof profileTabs)[number]["id"];
  onTabChange?: (tab: (typeof profileTabs)[number]["id"]) => void;
  onEdit?: () => void;
  onSync?: () => void;
  isSyncing?: boolean;
};

const ProfileHeader = ({ employee, roleName, companyName, activeTab, onTabChange, onEdit, onSync, isSyncing = false }: ProfileHeaderProps) => {
  const [localTab, setLocalTab] = useState<(typeof profileTabs)[number]["id"]>("general");
  const selectedTab = activeTab ?? localTab;
  const fullName = [employee.firstName, employee.lastName, employee.middleName].filter(Boolean).join(" ");
  const initials = `${employee.firstName?.charAt(0) ?? ""}${employee.lastName?.charAt(0) ?? ""}`.toUpperCase();
  const isInactive = employee.user?.status === "inactive";
  const canSync = onSync && !employee.verifixEmployeeId &&
    (employee.syncStatus === "failed" || employee.syncStatus === "pending");
  return (
    <section className="overflow-hidden rounded-[18px] border border-[#dfe3e9] bg-white">
      <div className="h-20 bg-[linear-gradient(105deg,#242b35_0%,#35404f_62%,#536173_100%)] sm:h-24" />

      <div className="px-4 pb-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 items-end gap-4">
            <div className="-mt-8 flex size-20 shrink-0 items-center justify-center rounded-[22px] border-4 border-white bg-[#fff0e9] text-[22px] font-bold text-[#c95021] shadow-[0_10px_28px_rgba(29,36,47,0.12)] sm:-mt-10 sm:size-24">
              {initials}
            </div>

            <div className="min-w-0 pb-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className=" mt-4 text-[21px] font-bold text-[#171b21] sm:text-[24px]">
                  {fullName}
                </h2>
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${isInactive ? "bg-[#f1f2f4] text-[#747d8a]" : "bg-[#e9f7ef] text-[#24704e]"}`}>
                  <span className={`size-1.5 rounded-full ${isInactive ? "bg-[#9aa2ae]" : "bg-[#31a66d]"}`} />
                  {isInactive ? "Nofaol" : "Faol"}
                </span>
              </div>
              <p className="mt-1 text-[13px] text-[#697587]">
                {roleName} · {companyName || employee.companyId}
              </p>
            </div>
          </div>

          <div className="flex gap-2 sm:pb-1">
            {canSync && (
            <button
              type="button"
              onClick={onSync}
              disabled={isSyncing}
              className="inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-[#dce1e7] bg-white px-3.5 text-[13px] font-medium text-[#4f5b6c] transition-colors hover:bg-[#f6f7f9] sm:flex-none"
            >
              <RefreshCw aria-hidden="true" className={`size-4 ${isSyncing ? "animate-spin" : ""}`} />
              {isSyncing ? "Sinxronlanmoqda..." : "Sinxronlash"}
            </button>
            )}
            {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#e8622a] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#d85620] sm:flex-none"
            >
              <Edit3 aria-hidden="true" className="size-4" />
              Tahrirlash
            </button>
            )}
          </div>
        </div>

        <div
          role={onTabChange ? "tablist" : "group"}
          aria-label="Xodim profili bo‘limlari"
          className="mt-5 flex items-center gap-1 overflow-x-auto border-t border-[#edf0f3] pt-3"
        >
          {profileTabs.map(
            (tab) => (
              <button
                key={tab.id}
                id={`employee-tab-${tab.id}`}
                type="button"
                role={onTabChange ? "tab" : undefined}
                aria-selected={onTabChange ? selectedTab === tab.id : undefined}
                aria-pressed={onTabChange ? undefined : selectedTab === tab.id}
                aria-controls={onTabChange ? `employee-panel-${tab.id}` : undefined}
                onClick={() => {
                  if (onTabChange) onTabChange(tab.id);
                  else setLocalTab(tab.id);
                }}
                className={`inline-flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-[8px] px-3 text-[12px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#20252d] ${
                  selectedTab === tab.id
                    ? "bg-[#20252d] font-semibold text-white"
                    : "bg-[#f9fafb] font-medium text-[#6c7788] hover:bg-[#edf0f3] hover:text-[#2d333c]"
                }`}
              >
                {tab.label}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
