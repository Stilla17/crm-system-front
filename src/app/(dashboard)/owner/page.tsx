"use client";
import { CheckCircle2, Search, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import CreateFormEmployee from "src/components/owner/create-form-employee";
import { useGetCompanies } from "src/hooks/companies/useGetCompanies";
import { useSystemUsers } from "src/hooks/users/useUsers";
import { getUserRoleName } from "src/lib/get-user-role-name";
import StateBlocks from "src/components/owner/state-blocks";
import AsideChangeOwners from "src/components/owner/aside-change-owners";
import { useGetRoles } from "src/hooks/roles/useGetRoles";

export default function OwnerPage() {
  const { data } = useGetCompanies();
  const { data: users = [] } = useSystemUsers();

  const [searchTerm, setSearchTerm] = useState("");
  const { data: roles = [] } = useGetRoles();

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filterCompany = normalizedSearchTerm
    ? (data ?? []).filter((company) =>
        company.companyName?.toLowerCase().includes(normalizedSearchTerm),
      )
    : (data ?? []);

  return (
    <div className="px-6 pb-8">
      <StateBlocks />
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

        <AsideChangeOwners />
      </div>

      <CreateFormEmployee />
    </div>
  );
}
