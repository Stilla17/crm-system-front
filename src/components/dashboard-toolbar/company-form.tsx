"use client";

import { Controller, useForm } from "react-hook-form";

import {
  COMPANY_TYPES,
  CompanyFormProps,
  type CompanyFormValues,
} from "src/types/company";

import { AppSelect } from "../others/app-select";
import { Check } from "lucide-react";

// Tavsiya etiladigan chiroyli brend ranglar palitrasi
const PRESET_COLORS = [
  "#e8622a", // To'q sariq (Orange)
  "#16a34a", // Yashil (Green)
  "#2563eb", // Moviy (Blue)
  "#8b5cf6", // Binafsharang (Purple)
  "#db2777", // Pushti (Pink)
  "#0891b2", // Firuza (Cyan)
  "#4b5563", // Kulrang (Slate)
];

export default function CompanyForm({
  defaultValues,
  isSubmitting = false,
  submitLabel,
  onSubmit,
}: CompanyFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompanyFormValues>({ defaultValues });

  return (
    <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
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
          aria-invalid={Boolean(errors.companyName)}
          className="w-full bg-transparent text-sm text-[#30272a] placeholder-[#b2aaab] outline-none"
        />
      </div>
      {errors.companyName && (
        <p className="mt-1 text-xs text-red-500">
          {errors.companyName.message}
        </p>
      )}

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
          rules={{ required: "Kompaniya turini tanlash shart" }}
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
                hasError={Boolean(fieldState.error)}
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

      {/* 3. Kompaniya brend rangi */}
      <div className="mt-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#41383a]">
          Brend rangi
        </label>

        <Controller
          name="brandColor"
          control={control}
          defaultValue="#e8622a"
          render={({ field }) => (
            <div className="mt-2 flex flex-wrap items-center gap-2.5">
              {/* Tayyor rang doirachalari */}

              {PRESET_COLORS.map((color) => {
                const isSelected =
                  field.value?.toLowerCase() === color.toLowerCase();
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => field.onChange(color)}
                    style={{ backgroundColor: color }}
                    className={`flex size-8 cursor-pointer items-center justify-center rounded-full transition-transform active:scale-90 ${
                      isSelected
                        ? "scale-110 ring-2 ring-black/20 ring-offset-2"
                        : "hover:scale-105"
                    }`}
                  >
                    {isSelected && (
                      <Check className="size-4 text-white drop-shadow-sm" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-[#bbf7d0] bg-[#f0fdf4] px-4 text-sm font-semibold text-[#15803d] transition hover:border-[#4ade80] hover:bg-[#dcfce7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saqlanmoqda..." : submitLabel}
      </button>
    </form>
  );
}
