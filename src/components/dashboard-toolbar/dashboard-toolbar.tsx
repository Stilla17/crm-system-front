"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { periods, toolbarExcludedRoutes } from "src/data/dashboard-toolbar";

import { CompanyFilter } from "./company-filter";
import { PeriodFilter } from "./period-filter";
import CustomModal from "../header/custom-modal";
import { Controller, useForm } from "react-hook-form";
import { COMPANY_TYPES, type CompanyFormValues } from "src/types/company";
import { AppSelect } from "../others/app-select";
import { useCreateCompany } from "src/hooks/companies/useCreateCompany";
import axios from "axios";
import { useGetCompanies } from "src/hooks/companies/useGetCompanies";

export function DashboardToolbar() {
  const pathname = usePathname();
  const [companyId, setCompanyId] = useState("all");
  const [periodId, setPeriodId] = useState("2026-09");
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  const { data: apiCompanies = [] } = useGetCompanies();
  const { mutate: createCompany } = useCreateCompany();

  const companies = [
    { id: "all", label: "Hammasi" },
    ...apiCompanies.map((company) => ({
      id: company.id,
      label: company.companyName,
    })),
  ];

  const { register, handleSubmit, control, reset } =
    useForm<CompanyFormValues>();

  const isExcluded = toolbarExcludedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isExcluded) return null;

  const onSubmit = (data: CompanyFormValues) => {
    console.log(data);
    createCompany(data, {
      onSuccess: (res) => {
        console.log(`Company yaratildi: ${res}`);
        reset();
        setIsCompanyModalOpen(false);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.error("Backend javobi:", error.response?.data);
          console.error("Status:", error.response?.status);
        }
      },
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
          onChange={setCompanyId}
        />
        <CustomModal
          title="Kompaniya qo'shish"
          description="Bu yerda yangi kompaniya yaratishingiz mumkin"
          open={isCompanyModalOpen}
          onOpenChange={setIsCompanyModalOpen}
          trigger={
            <button
              type="button"
              className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] border border-dashed border-[#b8c5d6] bg-[#f7f9fc] px-3.5 text-[13px] font-medium text-[#315487] transition-colors hover:border-[#2467d1] hover:bg-[#edf4ff] hover:text-[#1d5bb8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2467d1]"
            >
              <span className="text-lg leading-none">+</span>
              Yangi kompaniya
            </button>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="companyName"
              className="text-xs font-semibold uppercase tracking-wider text-[#41383a]"
            >
              Kompaniya nomi
            </label>
            <div className="group flex h-11 w-full items-center rounded-xl border border-[#e1e4e9] bg-[#f9fafb] px-3.5 transition-all duration-150 focus-within:border-[#e8622a] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#e8622a]/10 hover:border-[#cbd0d7]">
              <input
                id="companyName"
                type="text"
                {...register("companyName", {
                  required: "Kompaniya nomini kiritish shart",
                })}
                autoComplete="organization"
                placeholder="Kompaniya nomini kiriting"
                className="w-full bg-transparent text-sm text-[#30272a] placeholder-[#b2aaab] outline-none"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="companyType"
                className="text-xs font-semibold uppercase tracking-wider text-[#41383a]"
              >
                Kompaniya turi
              </label>

              <Controller
                name="type"
                control={control}
                rules={{
                  required: "Kompaniya turini tanlash shart",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <AppSelect
                      id="companyType"
                      ref={field.ref}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      options={COMPANY_TYPES}
                      placeholder="Kompaniya turini tanlang"
                      hasError={!!fieldState.error}
                    />

                    {fieldState.error && (
                      <p className="mt-1 text-xs text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <button
              type="submit"
              className="mt-4 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-[#bbf7d0] bg-[#f0fdf4] px-4 text-sm font-semibold text-[#15803d] transition hover:border-[#4ade80] hover:bg-[#dcfce7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
            >
              Yaratish
            </button>
          </form>
        </CustomModal>
      </section>

      <section
        aria-label="Sana filtri"
        className="overflow-x-auto rounded-[14px] border border-[#dfe2e7] bg-white px-3.5 py-2.5"
      >
        <PeriodFilter
          periods={periods}
          value={periodId}
          onChange={setPeriodId}
        />
      </section>
    </div>
  );
}
