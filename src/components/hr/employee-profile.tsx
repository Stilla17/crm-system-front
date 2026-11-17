"use client";

import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Fingerprint,
  KeyRound,
  Phone,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import InfoRow from "src/components/hr/InfoRow";
import { useCurrentCompany } from "src/hooks/companies/useCurrentCompany";
import { useEmployee } from "src/hooks/employees/useEmployee";
import { useRetryEmployeeSync } from "src/hooks/employees/useRetryEmployeeSync";
import { useGetRoles } from "src/hooks/roles/useGetRoles";
import { useState } from "react";
import { EmployeeEditForm } from "./employee-edit-form";
import { useAuthProfile } from "src/hooks/users/useAuthProfile";
import { profileTabs, syncMeta } from "src/data/employee";
import { formatDateTime } from "src/lib/formatter-phone";
import { getErrorMessage } from "src/lib/error";
import ProfileHeader from "../profile/ProfileHeader";
import { EmployeeAttendance } from "./employee-attendance";
import { EmployeeSalary } from "./employee-salary";

type EmployeeProfileProps = {
  employeeId: string;
};
type ProfileTab = (typeof profileTabs)[number]["id"];

export function EmployeeProfile({ employeeId }: EmployeeProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");
  const { companyName } = useCurrentCompany();
  const employeeQuery = useEmployee(employeeId, companyId);
  const retrySync = useRetryEmployeeSync(companyId ?? undefined);
  const { data: roles = [] } = useGetRoles();
  const { data: authProfile } = useAuthProfile();
  const employee = employeeQuery.data;
  const [activeTab, setActiveTab] = useState<ProfileTab>("general");

  const backHref = companyId
    ? { pathname: "/hr", query: { companyId } }
    : "/hr";

  if (employeeQuery.isLoading) {
    return (
      <div className="px-4 pb-8 sm:px-6">
        <div className="rounded-[17px] border border-[#e0e3e9] bg-white p-10 text-center text-sm text-[#748093]">
          Xodim ma’lumotlari yuklanmoqda...
        </div>
      </div>
    );
  }

  if (employeeQuery.isError || !employee) {
    return (
      <div className="px-4 pb-8 sm:px-6">
        <Link
          href={backHref}
          className="mb-3 inline-flex items-center gap-2 text-[13px] font-medium text-[#687487]"
        >
          <ArrowLeft className="size-4" />
          Xodimlar ro‘yxatiga qaytish
        </Link>
        <div className="rounded-[17px] border border-[#f0d8d5] bg-white p-10 text-center">
          <p className="text-sm font-medium text-red-600">
            {getErrorMessage(employeeQuery.error)}
          </p>
          <button
            type="button"
            onClick={() => void employeeQuery.refetch()}
            className="mt-3 cursor-pointer text-sm font-semibold text-[#c05225] underline"
          >
            Qayta yuklash
          </button>
        </div>
      </div>
    );
  }

  const roleName =
    roles.find((role) => role.id === employee.user?.roleId)?.roleName ??
    "Rol biriktirilmagan";
  const sync = syncMeta[employee.syncStatus];
  const canChangeCompany = authProfile?.roleScope === "system";

  const retry = () => {
    retrySync.mutate(employee.id, {
      onSuccess: () => {
        toast.success("Xodim Verifix bilan sinxronlandi");
        void employeeQuery.refetch();
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  return (
    <div className="px-4 pb-8 sm:px-6">
      <Link
        href={backHref}
        className="mb-3 inline-flex items-center gap-2 text-[13px] font-medium text-[#687487] transition-colors hover:text-[#252b34]"
      >
        <ArrowLeft className="size-4" />
        Xodimlar ro‘yxatiga qaytish
      </Link>

      <ProfileHeader
        employee={employee}
        roleName={roleName}
        companyName={companyName}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onEdit={() => {
          setActiveTab("general");
          setIsEditing((value) => !value);
        }}
        onSync={retry}
        isSyncing={retrySync.isPending}
      />

      <div
        id="employee-panel-general"
        role="tabpanel"
        aria-labelledby="employee-tab-general"
        hidden={activeTab !== "general"}
      >
        {isEditing && (
          <EmployeeEditForm
            employee={employee}
            companyId={companyId ?? undefined}
            canChangeCompany={canChangeCompany}
            onCancel={() => setIsEditing(false)}
            onSaved={(updatedEmployee) => {
              setIsEditing(false);
              if (companyId && updatedEmployee.companyId !== companyId) {
                router.replace(
                  `/hr/${updatedEmployee.id}?companyId=${updatedEmployee.companyId}`,
                );
                return;
              }
              void employeeQuery.refetch();
            }}
          />
        )}

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          <section className="rounded-[17px] border border-[#e0e3e9] bg-white p-4 sm:p-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-[10px] bg-[#eef1f8] text-[#435782]">
                <BriefcaseBusiness className="size-4.5" />
              </span>
              <div>
                <h2 className="text-[15px] font-semibold text-[#20252c]">
                  Xodim ma’lumotlari
                </h2>
                <p className="text-[11px] text-[#8a94a2]">
                  CRM va Verifix API’dan olingan ma’lumotlar
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <InfoRow
                icon={<BadgeCheck className="size-4" />}
                label="Rol"
                value={roleName}
              />
              <InfoRow
                icon={<Building2 className="size-4" />}
                label="Kompaniya"
                value={companyName || employee.companyId}
              />
              <InfoRow
                icon={<BriefcaseBusiness className="size-4" />}
                label="Verifix job ID"
                value={employee.jobId || "Biriktirilmagan"}
              />
              <InfoRow
                icon={<Building2 className="size-4" />}
                label="Verifix division ID"
                value={employee.divisionId || "Biriktirilmagan"}
              />
              <InfoRow
                icon={<UserRound className="size-4" />}
                label="Jinsi"
                value={employee.gender === "M" ? "Erkak" : "Ayol"}
              />
              <InfoRow
                icon={<Fingerprint className="size-4" />}
                label="Manba"
                value={employee.source === "verifix" ? "Verifix" : "CRM"}
              />
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-[17px] border border-[#e0e3e9] bg-white p-4 sm:p-5">
              <h2 className="text-[14px] font-semibold text-[#20252c]">
                Shaxsiy ma’lumotlar
              </h2>
              <div className="mt-3 space-y-1">
                <InfoRow
                  icon={<Phone className="size-4" />}
                  label="Telefon"
                  value={employee.phone || "Kiritilmagan"}
                />
                <InfoRow
                  icon={<CalendarDays className="size-4" />}
                  label="Tug‘ilgan sana"
                  value={employee.birthDate || "Kiritilmagan"}
                />
                <InfoRow
                  icon={<KeyRound className="size-4" />}
                  label="Login"
                  value={employee.user?.login || "CRM akkaunti yo‘q"}
                />
              </div>
            </section>

            <section className="rounded-[17px] border border-[#dce8e2] bg-white p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-[10px] bg-[#e9f7ef] text-[#297353]">
                    <Fingerprint className="size-4.5" />
                  </span>
                  <div>
                    <h2 className="text-[14px] font-semibold text-[#20252c]">
                      Verifix
                    </h2>
                    <p className="text-[11px] text-[#8a94a2]">
                      Integratsiya holati
                    </p>
                  </div>
                </div>
                <span
                  title={employee.syncError || undefined}
                  className={`rounded-full px-2 py-1 text-[10px] font-semibold ${sync.className}`}
                >
                  {sync.label}
                </span>
              </div>

              <dl className="mt-4 space-y-3 border-t border-[#edf1ef] pt-4 text-[12px]">
                <div className="flex justify-between gap-3">
                  <dt className="text-[#7c8795]">Verifix ID</dt>
                  <dd className="font-mono font-semibold text-[#323944]">
                    {employee.verifixEmployeeId || "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[#7c8795]">Oxirgi sinxron</dt>
                  <dd className="text-right font-medium text-[#323944]">
                    {formatDateTime(employee.lastSyncedAt)}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[#7c8795]">CRM Employee ID</dt>
                  <dd className="max-w-44 truncate font-mono text-[#323944]">
                    {employee.id}
                  </dd>
                </div>
              </dl>
            </section>
          </aside>
        </div>
      </div>

      {activeTab === "general" && (
        <>
          <EmployeeAttendance
            employeeId={employee.id}
            companyId={companyId ?? undefined}
            embedded
          />
          <EmployeeSalary
            employeeId={employee.id}
            companyId={companyId ?? undefined}
            embedded
          />
        </>
      )}

      {activeTab === "attendance" && (
        <EmployeeAttendance
          employeeId={employee.id}
          companyId={companyId ?? undefined}
        />
      )}

      {activeTab === "salary" && (
        <EmployeeSalary
          employeeId={employee.id}
          companyId={companyId ?? undefined}
        />
      )}

    </div>
  );
}
