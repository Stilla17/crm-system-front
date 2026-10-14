"use client";
import {
  CheckCircle2,
  Mail,
  Search,
  ShieldCheck,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import CreateFormEmployee from "src/components/owner/create-form-employee";
import { getState } from "src/data/company-summaries";
import { useGetCompanies } from "src/hooks/companies/useGetCompanies";
import { AppSelect } from "src/components/others/app-select";
import { useCurrentUser } from "src/hooks/users/useCurrentUser";
import { useSystemRoles } from "src/hooks/roles/useSystemRoles";
import { getUserRoleName } from "src/lib/get-user-role-name";

export default function OwnerPage() {
  const { data } = useGetCompanies();
  const { data: users = [] } = useCurrentUser();
  console.log(users);

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null,
  );
  const { data: roles = [] } = useSystemRoles();

  const countAdmin =
    data?.filter((company) => company.admin != null).length ?? 0;
  const state = getState(data?.length ?? 0, countAdmin);
  console.log(data);

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filterCompany = normalizedSearchTerm
    ? (data ?? []).filter((company) =>
        company.companyName?.toLowerCase().includes(normalizedSearchTerm),
      )
    : (data ?? []);

  const companyOptions =
    data?.map((company) => ({
      value: company.id,
      label: company.companyName,
    })) ?? [];

  return (
    <div className="px-6 pb-8">
      <section
        aria-label="Rahbarlar bo‘yicha qisqa ma’lumot"
        className="grid gap-3.5 md:grid-cols-3"
      >
        {state?.map((company, index) => (
          <div
            key={index}
            className="rounded-[17px] border border-[#e0e3e9] bg-white p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] text-[#687385]">{company.desc}</p>
                <p className="mt-1.5 text-[28px] font-semibold tracking-[-0.04em] text-[#15191f]">
                  {company.count}
                </p>
              </div>
              <div className="flex size-9 items-center justify-center rounded-[11px] bg-[#f1f3f6] text-[#596679]">
                {company.icon}
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="mt-4 grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section
          aria-labelledby="company-leadership-title"
          className="overflow-hidden rounded-[17px] border border-[#e0e3e9] bg-white"
        >
          <div className="flex flex-col gap-4 border-b border-[#e9ebef] px-5 py-[18px] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="company-leadership-title"
                className="text-[15px] font-semibold text-[#15191f]"
              >
                Kompaniyalar va rahbarlar
              </h2>
              <p className="mt-1 text-[13px] text-[#748093]">
                Har bir kompaniya uchun mas’ul rahbar holati
              </p>
            </div>

            <label className="flex h-9 w-full items-center gap-2 rounded-[10px] border border-[#dde1e7] bg-[#f9fafb] px-3 sm:w-[230px]">
              <Search aria-hidden="true" className="size-4 text-[#8c96a5]" />
              <span className="sr-only">Kompaniyani qidirish</span>
              <input
                type="search"
                placeholder="Kompaniyani qidirish"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[13px] text-[#303742] outline-none placeholder:text-[#9aa2ae]"
              />
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] table-fixed border-collapse">
              <caption className="sr-only">
                Kompaniyalar va ularga tayinlangan rahbarlar ro‘yxati
              </caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Kompaniya</th>
                  <th scope="col">Rahbar</th>
                  <th scope="col">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eceef2]">
                {filterCompany?.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-[#fafbfc]"
                  >
                    <td className="w-[38%] px-5 py-[18px] align-middle">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="h-10 w-1 shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              item.status === "archived"
                                ? "transparent"
                                : item.brandColor,
                          }}
                        />
                        <div className="min-w-0">
                          <p
                            className={
                              item.status === "archived"
                                ? "truncate text-sm font-semibold text-gray-400 line-through"
                                : "truncate text-sm font-semibold text-[#20252d]"
                            }
                          >
                            {item.companyName}
                          </p>
                          <p
                            className={
                              item.status === "archived"
                                ? "mt-0.5 text-xs text-gray-400 line-through"
                                : "mt-0.5 text-xs text-[#818b9a]"
                            }
                          >
                            {item.type}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="w-[44%] px-5 py-[18px] align-middle">
                      {item.admin ? (
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#eef1f5] text-xs font-semibold text-[#465367]">
                            {item.admin.name.at(0) +
                              "" +
                              item.admin.middleName.at(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="truncate text-[13px] font-semibold text-[#252b34]">
                                {item.admin.name + " "}
                                {item.admin.middleName}
                              </p>
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f6ee] px-2 py-0.5 text-[10px] font-semibold text-[#24704e]">
                                <CheckCircle2
                                  aria-hidden="true"
                                  className="size-3"
                                />
                                Faol
                              </span>
                            </div>
                            <p className="mt-0.5 truncate text-xs text-[#7b8695]">
                              {getUserRoleName(item.admin.id, users, roles)} ·{" "}
                              {item.admin.phone}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 rounded-[11px] border border-dashed border-[#e4bda8] bg-[#fff8f3] px-3 py-2.5">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#fbe7dc] text-[#bd5d31]">
                            <UserRoundPlus
                              aria-hidden="true"
                              className="size-4"
                            />
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-[#7c4025]">
                              Rahbar tayinlanmagan
                            </p>
                            <p className="mt-0.5 text-[11px] text-[#aa755d]">
                              Nomzod tanlash talab qilinadi
                            </p>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="rounded-[17px] border border-[#e0e3e9] bg-white p-5 xl:sticky xl:top-4">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-[#fcece6] text-[#bd572b]">
              <UserRoundPlus aria-hidden="true" className="size-5" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-[#15191f]">
                Rahbar tayinlash
              </h2>
              <p className="mt-1 text-[12px] leading-[17px] text-[#7a8595]">
                Kompaniya va mos nomzodni tanlang
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Kompaniya
              </span>

              <AppSelect
                id="companyId"
                value={selectedCompanyId}
                onChange={setSelectedCompanyId}
                options={companyOptions}
                placeholder="Kompaniyani tanlang"
              />
            </label>

            <fieldset>
              <legend className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Rahbar nomzodi
              </legend>
              <div className="space-y-2">
                {users.map((user) => {
                  const initials = `${user.name?.charAt(0) ?? ""}${
                    user.middleName?.charAt(0) ?? ""
                  }`.toUpperCase();
                  const roleName =
                    user.roleName ??
                    roles.find((role) => role.id === user.roleId)?.roleName;

                  return (
                    <label
                      key={user.id}
                      className="flex cursor-pointer items-center gap-3 rounded-[11px] border border-[#e2e5ea] px-3 py-2.5 transition has-checked:border-[#e8622a] has-checked:bg-[#fff8f4]"
                    >
                      <input
                        type="radio"
                        name="manager-candidate"
                        value={user.id}
                        checked={selectedUserId === user.id}
                        onChange={() => setSelectedUserId(user.id)}
                        className="peer sr-only"
                      />

                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e8efff] text-[11px] font-semibold text-[#3159a5]">
                        {initials}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-semibold text-[#2c333d]">
                          {user.name} {user.middleName}
                        </span>

                        <span className="mt-0.5 block truncate text-[11px] text-[#808a98]">
                          {roleName ?? "Rol biriktirilmagan"} · {user.phone}
                        </span>
                      </span>

                      <span className="flex size-[18px] items-center justify-center rounded-full border border-[#cdd2da] bg-white after:size-2 after:rounded-full peer-checked:border-[#e8622a] peer-checked:after:bg-[#e8622a]" />
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <button
              type="button"
              className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#e8622a] px-4 text-[13px] font-semibold text-white transition hover:bg-[#d85620] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8622a]"
            >
              <UsersRound aria-hidden="true" className="size-4" />
              Rahbarni tayinlash
            </button>
          </div>
        </aside>
      </div>

      <CreateFormEmployee />
    </div>
  );
}
