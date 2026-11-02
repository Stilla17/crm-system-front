"use client";

import { isAxiosError } from "axios";
import {
  Download,
  RefreshCw,
  Search,
  UserPlus,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useEmployees,
  useSystemEmployees,
} from "src/hooks/employees/useEmployees";
import { useImportVerifixEmployees } from "src/hooks/employees/useImportVerifixEmployees";
import { useRetryEmployeeSync } from "src/hooks/employees/useRetryEmployeeSync";
import { useGetRoles } from "src/hooks/roles/useGetRoles";
import type { EmployeeSyncStatus } from "src/types/employee.type";
import AppPagination from "../others/app-pagination";

type EmployeeRow = {
  id: string;
  companyId?: string;
  employeeId?: string;
  firstName: string;
  lastName: string;
  login?: string;
  phone?: string;
  birthDate?: string;
  roleName?: string;
  status?: "active" | "inactive";
  syncStatus?: EmployeeSyncStatus;
  syncError?: string | null;
  verifixEmployeeId?: string | null;
};

const syncMeta: Record<
  EmployeeSyncStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Kutilmoqda",
    className: "bg-[#fff6e6] text-[#9a681d]",
  },
  syncing: {
    label: "Yuborilmoqda",
    className: "bg-[#edf3ff] text-[#3d61a8]",
  },
  synced: {
    label: "Sinxron",
    className: "bg-[#e8f6ee] text-[#24704e]",
  },
  failed: {
    label: "Xatolik",
    className: "bg-[#fff0ee] text-[#b33d32]",
  },
};

const errorMessage = (error: unknown) => {
  if (!isAxiosError(error)) return "Amalni bajarishda xatolik yuz berdi";

  const data = error.response?.data as
    | { message?: string | string[] }
    | undefined;
  const message = data?.message;
  return Array.isArray(message)
    ? message[0]
    : message || "Amalni bajarishda xatolik yuz berdi";
};

type EmployeesTableProps = {
  companyId?: string;
  isSuperAdmin?: boolean;
};

const PAGE_SIZE = 10;

export function EmployeesTable({
  companyId,
  isSuperAdmin = false,
}: EmployeesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const isSystemView = isSuperAdmin && !companyId;
  const scopedCompanyId = isSuperAdmin ? companyId : undefined;

  const params = {
    page,
    limit: PAGE_SIZE,
    search: searchTerm.trim() || undefined,
  };

  const companyEmployeesQuery = useEmployees(
    params,
    !isSystemView,
    scopedCompanyId,
  );
  const systemEmployeesQuery = useSystemEmployees(params, isSystemView);

  const employeesQuery = isSystemView
    ? systemEmployeesQuery
    : companyEmployeesQuery;

  const { data: roles = [] } = useGetRoles();
  const retrySync = useRetryEmployeeSync(scopedCompanyId);
  const importEmployees = useImportVerifixEmployees(scopedCompanyId);

  const rows = useMemo<EmployeeRow[]>(() => {
    return (employeesQuery.data?.items ?? []).map((employee) => ({
      id: employee.id,
      employeeId: employee.id,
      companyId: employee.companyId,
      firstName: employee.firstName,
      lastName: employee.lastName,
      login: employee.user?.login,
      phone: employee.phone,
      birthDate: employee.birthDate,
      roleName: roles.find((role) => role.id === employee.user?.roleId)
        ?.roleName,
      status: employee.user?.status,
      syncStatus: employee.syncStatus,
      syncError: employee.syncError,
      verifixEmployeeId: employee.verifixEmployeeId,
    }));
  }, [employeesQuery.data, roles]);

  const meta = employeesQuery.data?.meta;
  const total = meta?.total ?? 0;

  const startIndex = meta ? (meta.page - 1) * meta.limit : 0;
  const isLoading = employeesQuery.isLoading;
  const isError = employeesQuery.isError;

  const refetch = () => {
    void employeesQuery.refetch();
  };

  const retry = (employeeId: string) => {
    retrySync.mutate(employeeId, {
      onSuccess: () => toast.success("Xodim Verifix bilan sinxronlandi"),
      onError: (error) => toast.error(errorMessage(error)),
    });
  };

  const importFromVerifix = () => {
    if (isSystemView) {
      toast.info("Verifixdan import qilish uchun avval kompaniyani tanlang");
      return;
    }

    importEmployees.mutate(undefined, {
      onSuccess: (result) => {
        toast.success(
          `Verifixdan ${result.received} ta xodim olindi: ${result.created} ta yangi, ${result.updated} ta yangilandi`,
        );
      },
      onError: (error) => toast.error(errorMessage(error)),
    });
  };

  return (
    <section className="overflow-hidden rounded-[17px] border border-[#e0e3e9] bg-white">
      <div className="flex flex-col gap-4 border-b border-[#e9ebef] px-5 py-[18px] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-[#eef1f8] text-[#435782]">
            <UsersRound aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold text-[#15191f]">
              Xodimlar ro‘yxati
            </h2>
            <p className="mt-1 text-[12px] text-[#7a8595]">
              Jami {total} ta xodim
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <label className="flex h-9 w-full items-center gap-2 rounded-[10px] border border-[#dde1e7] bg-[#f9fafb] px-3 sm:w-[260px]">
            <Search aria-hidden="true" className="size-4 text-[#8c96a5]" />
            <span className="sr-only">Xodimni qidirish</span>
            <input
              type="search"
              value={searchTerm}
              maxLength={100}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setPage(1);
              }}
              placeholder="Ism, telefon yoki Verifix ID"
              className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#9aa2ae]"
            />
            {employeesQuery.isFetching && !isLoading && (
              <RefreshCw
                aria-label="Natijalar yangilanmoqda"
                className="size-4 shrink-0 animate-spin text-[#8c96a5]"
              />
            )}
          </label>
          <button
            type="button"
            onClick={importFromVerifix}
            disabled={importEmployees.isPending}
            className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-[#dce1e7] bg-white px-4 text-[13px] font-semibold text-[#435782] transition hover:bg-[#f6f8fc] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {importEmployees.isPending ? (
              <RefreshCw aria-hidden="true" className="size-4 animate-spin" />
            ) : (
              <Download aria-hidden="true" className="size-4" />
            )}
            {importEmployees.isPending
              ? "Import qilinmoqda..."
              : "Verifixdan import"}
          </button>
          <Link
            href="/hr/create"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-[10px] bg-[#e8622a] px-4 text-[13px] font-semibold text-white hover:bg-[#d85620]"
          >
            <UserPlus aria-hidden="true" className="size-4" />
            Yangi xodim qo‘shish
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-sm text-[#748093]">
          Xodimlar yuklanmoqda...
        </div>
      ) : isError ? (
        <div className="p-8 text-center">
          <p className="text-sm text-red-600">Xodimlarni yuklab bo‘lmadi</p>
          <button
            type="button"
            onClick={refetch}
            className="mt-3 cursor-pointer text-sm font-medium text-[#c05225] underline"
          >
            Qayta yuklash
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead className="bg-[#f8f9fb] text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[#737e8e]">
              <tr>
                <th className="px-5 py-3">Xodim</th>
                <th className="px-4 py-3">Telefon</th>
                <th className="px-4 py-3">Tug‘ilgan sana</th>
                <th className="px-4 py-3">Lavozim</th>
                <th className="px-4 py-3">Verifix ID</th>
                <th className="px-4 py-3">Sinxronlash</th>
                <th className="px-5 py-3 text-right">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef2]">
              {rows.map((employee, index) => {
                const sync = employee.syncStatus
                  ? syncMeta[employee.syncStatus]
                  : undefined;
                const isRetrying =
                  retrySync.isPending &&
                  retrySync.variables === employee.employeeId;
                const initials =
                  `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`.toUpperCase();
                const profileHref = employee.employeeId
                  ? {
                      pathname: `/hr/${employee.employeeId}`,
                      query:
                        employee.companyId && isSuperAdmin
                          ? { companyId: employee.companyId }
                          : undefined,
                    }
                  : null;

                return (
                  <tr key={employee.id} className="hover:bg-[#fafbfc]">
                    <td className="px-5 py-4">
                      {profileHref ? (
                        <Link
                          href={profileHref}
                          className="flex items-center gap-3"
                        >
                          <span className="flex size-9 items-center justify-center rounded-full bg-[#e8efff] text-[11px] font-semibold text-[#3159a5]">
                            {initials}
                          </span>
                          <span className="text-[13px] font-medium text-[#252b34]">
                            {startIndex + index + 1}. {employee.firstName}{" "}
                            {employee.lastName}
                          </span>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 items-center justify-center rounded-full bg-[#f1f2f4] text-[11px] font-semibold text-[#747d8a]">
                            {initials}
                          </span>
                          <span className="text-[13px] font-medium text-[#252b34]">
                            {employee.firstName} {employee.lastName}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-[13px] text-[#596477]">
                      {employee.phone || "—"}
                    </td>
                    <td className="px-4 py-4 text-[13px] text-[#596477]">
                      {employee.birthDate || "—"}
                    </td>
                    <td className="px-4 py-4 text-[13px] text-[#303742]">
                      {employee.roleName || "Rol biriktirilmagan"}
                    </td>
                    <td className="px-4 py-4 font-mono text-[12px] text-[#596477]">
                      {employee.verifixEmployeeId || "—"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="inline-flex flex-col items-start gap-1.5">
                        {sync ? (
                          <span
                            title={employee.syncError || undefined}
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${sync.className}`}
                          >
                            {sync.label}
                          </span>
                        ) : (
                          <span className="rounded-full bg-[#f1f2f4] px-2.5 py-1 text-[11px] font-semibold text-[#747d8a]">
                            Ulanmagan
                          </span>
                        )}
                        {employee.syncStatus === "failed" &&
                          employee.employeeId && (
                            <button
                              type="button"
                              onClick={() => retry(employee.employeeId!)}
                              disabled={retrySync.isPending}
                              className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-semibold text-[#b33d32] underline disabled:opacity-50"
                            >
                              <RefreshCw
                                className={`size-3 ${isRetrying ? "animate-spin" : ""}`}
                              />
                              Qayta sync
                            </button>
                          )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span
                        className={
                          employee.status === "inactive"
                            ? "rounded-full bg-[#f1f2f4] px-2.5 py-1 text-[11px] font-semibold text-[#747d8a]"
                            : "rounded-full bg-[#e8f6ee] px-2.5 py-1 text-[11px] font-semibold text-[#24704e]"
                        }
                      >
                        {employee.status === "inactive" ? "Nofaol" : "Faol"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {meta && (
            <div className="flex flex-col gap-3 border-t border-[#e9ebef] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12px] text-[#7a8595]">
                {rows.length > 0
                  ? `${startIndex + 1}–${startIndex + rows.length} / ${meta.total} ta xodim`
                  : `Jami ${meta.total} ta xodim`}
              </p>
              <AppPagination
                page={meta.page}
                totalPages={meta.totalPages}
                disabled={employeesQuery.isFetching}
                onPageChange={setPage}
              />
            </div>
          )}

          {rows.length === 0 && (
            <div className="p-8 text-center text-sm text-[#748093]">
              {searchTerm
                ? "Qidiruv bo‘yicha xodim topilmadi"
                : "Hozircha xodimlar mavjud emas"}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
