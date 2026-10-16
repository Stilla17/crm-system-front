"use client";
import { UserRoundPlus, UsersRound } from "lucide-react";
import React, { useState } from "react";
import { AppSelect } from "../others/app-select";
import { useGetCompanies } from "src/hooks/companies/useGetCompanies";
import { useSystemUsers } from "src/hooks/users/useUsers";
import { useReplaceCompanyAdmin } from "src/hooks/companies/useReplaceCompanyAdmin";
import { toast } from "sonner";
import { useGetRoles } from "src/hooks/roles/useGetRoles";
import { isAxiosError } from "axios";

const AsideChangeOwners = () => {
  const { data } = useGetCompanies();
  const { data: users = [] } = useSystemUsers();
  const { data: roles = [] } = useGetRoles();
  const { mutate, isPending } = useReplaceCompanyAdmin();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null,
  );
  const selectedCompany = data?.find(
    (company) => company.id === selectedCompanyId,
  );
  const candidates = selectedCompanyId
    ? users.filter((user) => user.id !== selectedCompany?.admin?.id)
    : [];
  const companyOptions =
    data?.map((company) => ({
      value: company.id,
      label: company.companyName,
    })) ?? [];

  const handleSubmit = () => {
    if (!selectedCompanyId) {
      toast.warning("Iltimos, kompaniyani tanlang!");
      return;
    }

    if (!selectedUserId) {
      toast.warning("Iltimos, nomzod xodimni tanlang!");
      return;
    }

    mutate(
      { id: selectedCompanyId, newAdminId: selectedUserId },
      {
        onSuccess: () => {
          toast.success("Rahbar muvaffaqiyatli tayinlandi!");
          setSelectedUserId(null);
        },
        onError: (error) => {
          const responseData = isAxiosError(error)
            ? (error.response?.data as
                | { message?: string | string[] }
                | undefined)
            : undefined;
          const message = responseData?.message;

          toast.error(
            Array.isArray(message)
              ? message[0]
              : message || "Rahbarni tayinlab bo‘lmadi",
          );
        },
      },
    );
  };
  return (
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
            onChange={(companyId) => {
              setSelectedCompanyId(companyId);
              const company = data?.find((item) => item.id === companyId);
              const availableCandidates = users.filter(
                (user) => user.id !== company?.admin?.id,
              );

              setSelectedUserId(
                availableCandidates.length === 1
                  ? availableCandidates[0].id
                  : null,
              );
            }}
            options={companyOptions}
            placeholder="Kompaniyani tanlang"
          />
        </label>

        <fieldset>
          <legend className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
            Rahbar nomzodi
          </legend>
          <div className="space-y-2">
            {selectedCompanyId && candidates.length === 0 && (
              <div className="rounded-[11px] border border-dashed border-[#dfe3e8] bg-[#f8f9fb] px-3 py-4 text-center text-xs text-[#7a8595]">
                Tayinlash uchun nomzod mavjud emas
              </div>
            )}
            {candidates.map((user) => {
              const initials = `${user.name?.charAt(0) ?? ""}${
                user.middleName?.charAt(0) ?? ""
              }`.toUpperCase();
              const roleName =
                user.roleName ??
                roles.find((role) => role.id === user.roleId)?.roleName;

              return (
                <label
                  key={user.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-[11px] border px-3 py-2.5 transition ${
                    selectedUserId === user.id
                      ? "border-[#e8622a] bg-[#fff8f4]"
                      : "border-[#e2e5ea] bg-white hover:border-[#cfd4db]"
                  }`}
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
          onClick={handleSubmit}
          disabled={isPending}
          className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#e8622a] px-4 text-[13px] font-semibold text-white transition hover:bg-[#d85620] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8622a] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <UsersRound aria-hidden="true" className="size-4" />
          {isPending ? "Tayinlanmoqda..." : "Rahbarni tayinlash"}
        </button>
      </div>
    </aside>
  );
};

export default AsideChangeOwners;
