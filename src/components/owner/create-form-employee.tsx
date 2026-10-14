"use client";
import {
  ChevronDown,
  KeyRound,
  Mail,
  Phone,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { AppSelect } from "../others/app-select";
import { useState } from "react";
import { useGetCompanies } from "src/hooks/companies/useGetCompanies";
const CreateFormEmployee = () => {
  const { data } = useGetCompanies();

  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null,
  );

  const companyOptions =
    data?.map((company) => ({
      value: company.id,
      label: company.companyName,
    })) ?? [];
  return (
    <section
      aria-labelledby="create-employee-title"
      className="mt-4 overflow-hidden rounded-[17px] border border-[#e0e3e9] bg-white"
    >
      <div className="flex flex-col gap-4 border-b border-[#e9ebef] px-5 py-[18px] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-[#eceef8] text-[#3d4c8c]">
            <UserPlus aria-hidden="true" className="size-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2
                id="create-employee-title"
                className="text-[15px] font-semibold text-[#15191f]"
              >
                Kompaniyaga xodim qo‘shish
              </h2>
              <span className="rounded-full border border-[#dce0ee] bg-[#f5f6fb] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#58669d]">
                Super Admin
              </span>
            </div>
            <p className="mt-1 text-[13px] text-[#748093]">
              Xodim akkaunti, lavozimi va boshlang‘ich ruxsatlarini belgilang
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-[10px] border border-[#e1e5ea] bg-[#f8f9fb] px-3 py-2 text-xs text-[#657185]">
          <ShieldCheck aria-hidden="true" className="size-4 text-[#4b5d79]" />
          Akkaunt faqat tanlangan kompaniyaga biriktiriladi
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_330px]">
        <form className="p-5 xl:border-r xl:border-[#e9ebef]">
          <div className="grid gap-4 md:grid-cols-2">
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

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Lavozim
              </span>
              <span className="relative block">
                <select
                  name="position"
                  defaultValue=""
                  className="h-11 w-full appearance-none rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 pr-10 text-[13px] text-[#303742] outline-none transition focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                >
                  <option value="" disabled>
                    Lavozimni tanlang
                  </option>
                  <option value="sales-manager">Sotuv menejeri</option>
                  <option value="accountant">Buxgalter</option>
                  <option value="hr-manager">HR menejer</option>
                  <option value="warehouse-manager">Ombor mudiri</option>
                  <option value="operator">Operator</option>
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#7d8795]"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Ism
              </span>
              <input
                name="firstName"
                type="text"
                placeholder="Xodim ismi"
                className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Familiya
              </span>
              <input
                name="lastName"
                type="text"
                placeholder="Xodim familiyasi"
                className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Telefon raqam
              </span>
              <span className="relative block">
                <Phone
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8b95a4]"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] pl-10 pr-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Email
              </span>
              <span className="relative block">
                <Mail
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8b95a4]"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="xodim@company.uz"
                  className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] pl-10 pr-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Login
              </span>
              <input
                name="login"
                type="text"
                autoComplete="off"
                placeholder="Masalan: sardor.i"
                className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Vaqtinchalik parol
              </span>
              <span className="relative block">
                <KeyRound
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8b95a4]"
                />
                <input
                  name="temporaryPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Kamida 8 ta belgi"
                  className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] pl-10 pr-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                />
              </span>
            </label>
          </div>

          <fieldset className="mt-5">
            <legend className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
              Boshlang‘ich ruxsatlar
            </legend>
            <p className="mt-1 text-xs text-[#8992a0]">
              Xodim foydalanishi mumkin bo‘lgan bo‘limlarni belgilang
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {["Sotuv", "Moliya", "Ta’minot", "Hisobotlar"].map(
                (permission, index) => (
                  <label
                    key={permission}
                    className="flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-[#e1e4e9] bg-[#fafbfc] px-3 py-2.5 text-[12px] font-medium text-[#4e596a] transition has-checked:border-[#e9a384] has-checked:bg-[#fff7f3] has-checked:text-[#9a4825]"
                  >
                    <input
                      type="checkbox"
                      name="permissions"
                      value={permission}
                      defaultChecked={index === 0}
                      className="size-4 accent-[#e8622a]"
                    />
                    {permission}
                  </label>
                ),
              )}
            </div>
          </fieldset>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-[#eceef2] pt-4 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="reset"
              className="h-10 cursor-pointer rounded-[10px] border border-[#dce0e6] bg-white px-4 text-[13px] font-medium text-[#596477] transition hover:bg-[#f6f7f9]"
            >
              Tozalash
            </button>
            <button
              type="button"
              className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#171a1f] px-5 text-[13px] font-semibold text-white transition hover:bg-[#282d35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171a1f]"
            >
              <UserPlus aria-hidden="true" className="size-4" />
              Xodimni yaratish
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateFormEmployee;
