"use client";

import { Search, ShieldCheck, UserPlus, UsersRound } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useGetRoles } from "src/hooks/roles/useGetRoles";
import { useUsers } from "src/hooks/users/useUsers";

const formatDate = (value?: string) => {
  if (!value) return "—";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("uz-UZ").format(date);
};

export function UsersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: users = [], isLoading, isError, refetch } = useUsers();
  const { data: roles = [] } = useGetRoles();

  const visibleUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return users;

    return users.filter((user) =>
      [user.name, user.middleName, user.login, user.phone, user.roleName]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(term)),
    );
  }, [searchTerm, users]);

  return (
    <section className="overflow-hidden rounded-[17px] border border-[#e0e3e9] bg-white">
      <div className="flex flex-col gap-4 border-b border-[#e9ebef] px-5 py-[18px] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-[#eef1f8] text-[#435782]">
            <UsersRound aria-hidden="true" className="size-5" />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-[#15191f]">
              Xodimlar ro‘yxati
            </h2>
            <p className="mt-1 text-[12px] text-[#7a8595]">
              Jami {users.length} ta xodim
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <label className="flex h-9 w-full items-center gap-2 rounded-[10px] border border-[#dde1e7] bg-[#f9fafb] px-3 sm:w-[260px]">
            <Search aria-hidden="true" className="size-4 text-[#8c96a5]" />
            <span className="sr-only">Xodimni qidirish</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Ism, login yoki telefon"
              className="min-w-0 flex-1 bg-transparent text-[13px] text-[#303742] outline-none placeholder:text-[#9aa2ae]"
            />
          </label>

          <Link
            href="/hr/create"
            className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-[10px] bg-[#e8622a] px-4 text-[13px] font-semibold text-white transition hover:bg-[#d85620] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8622a]"
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
            onClick={() => refetch()}
            className="mt-3 cursor-pointer text-sm font-medium text-[#c05225] underline underline-offset-2"
          >
            Qayta yuklash
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse">
            <thead className="bg-[#f8f9fb] text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[#737e8e]">
              <tr>
                <th className="px-5 py-3">Xodim</th>
                <th className="px-4 py-3">Login</th>
                <th className="px-4 py-3">Telefon</th>
                <th className="px-4 py-3">Tug‘ilgan sana</th>
                <th className="px-4 py-3">Lavozim</th>
                <th className="px-4 py-3">Ruxsatlar</th>
                <th className="px-5 py-3 text-right">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef2]">
              {visibleUsers.map((user) => {
                const roleName =
                  user.roleName ??
                  roles.find((role) => role.id === user.roleId)?.roleName ??
                  "Rol biriktirilmagan";
                const permissionCount = user.permissions?.length ?? 0;
                const initials = `${user.name?.charAt(0) ?? ""}${
                  user.middleName?.charAt(0) ?? ""
                }`.toUpperCase();

                return (
                  <tr key={user.id} className="transition-colors hover:bg-[#fafbfc]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8efff] text-[11px] font-semibold text-[#3159a5]">
                          {initials}
                        </span>
                        <span className="font-medium text-[13px] text-[#252b34]">
                          {user.name} {user.middleName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[13px] text-[#596477]">
                      {user.login}
                    </td>
                    <td className="px-4 py-4 text-[13px] text-[#596477]">
                      {user.phone}
                    </td>
                    <td className="px-4 py-4 text-[13px] text-[#596477]">
                      {formatDate(user.date)}
                    </td>
                    <td className="px-4 py-4 text-[13px] text-[#303742]">
                      {roleName}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-[#667184]">
                        <ShieldCheck aria-hidden="true" className="size-3.5" />
                        {permissionCount} ta
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span
                        className={
                          user.status === "inactive"
                            ? "inline-flex rounded-full bg-[#f1f2f4] px-2.5 py-1 text-[11px] font-semibold text-[#747d8a]"
                            : "inline-flex rounded-full bg-[#e8f6ee] px-2.5 py-1 text-[11px] font-semibold text-[#24704e]"
                        }
                      >
                        {user.status === "inactive" ? "Nofaol" : "Faol"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {visibleUsers.length === 0 && (
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
