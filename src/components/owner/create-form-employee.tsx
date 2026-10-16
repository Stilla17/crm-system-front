"use client";
import {
  Calendar,
  Eye,
  EyeOff,
  KeyRound,
  Phone,
  UserPlus,
} from "lucide-react";
import { AppSelect } from "../others/app-select";
import { useGetCompanies } from "src/hooks/companies/useGetCompanies";
import { Controller, useForm } from "react-hook-form";
import { useCreateCompanyUser } from "src/hooks/users/useCreateCompanyUser";
import type { EmployeeFormValues } from "src/types/employee.type";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { formatUzPhone } from "src/lib/formatter-phone";
import CreateRoleForEmployers from "./create-role-employers";
import { useGetRoles } from "src/hooks/roles/useGetRoles";
import { useState } from "react";
import { useCreateUser } from "src/hooks/users/useCreateUser";
import type { CreateEmployeePayload } from "src/types/employee.type";

const DEFAULT_VALUES: EmployeeFormValues = {
  companyId: "",
  roleId: "",
  name: "",
  middleName: "",
  phone: "",
  date: "",
  login: "",
  password: "",
};

type CreateFormEmployeeProps = {
  mode?: "system" | "company";
};

const CreateFormEmployee = ({ mode = "system" }: CreateFormEmployeeProps) => {
  const [open, setOpen] = useState(false);
  const isSystemMode = mode === "system";

  const { data } = useGetCompanies(isSystemMode);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const {
    mutate: createCompanyUser,
    isPending: isCreatingCompanyUser,
  } = useCreateCompanyUser();
  const { mutate: createUser, isPending: isCreatingUser } = useCreateUser();
  const isPending = isCreatingCompanyUser || isCreatingUser;
  const {
    data: roles = [],
    isLoading: areRolesLoading,
    isError: areRolesError,
    refetch: refetchRoles,
  } = useGetRoles();

  const onSubmit = (formData: EmployeeFormValues) => {
    const normalizedData = {
      ...formData,
      name: formData.name.trim(),
      middleName: formData.middleName.trim(),
      login: formData.login.trim().toLowerCase(),
      phone: formData.phone.replace(/[\s()-]/g, ""),
    };
    const mutationOptions = {
      onSuccess: () => {
        toast.success("Xodim muvaffaqiyatli qo‘shildi");
        reset();
      },
      onError: (error: unknown) => {
        const responseData = isAxiosError(error)
          ? (error.response?.data as
              | { message?: string | string[] }
              | undefined)
          : undefined;
        const message = responseData?.message;

        toast.error(
          Array.isArray(message)
            ? message[0]
            : message || "Xodimni qo‘shishda xatolik yuz berdi",
        );
      },
    };

    if (isSystemMode) {
      createCompanyUser(normalizedData, mutationOptions);
      return;
    }

    const userData: CreateEmployeePayload = {
      roleId: normalizedData.roleId,
      name: normalizedData.name,
      middleName: normalizedData.middleName,
      phone: normalizedData.phone,
      date: normalizedData.date,
      login: normalizedData.login,
      password: normalizedData.password,
    };

    createUser(userData, mutationOptions);
  };

  const companyOptions =
    data?.map((company) => ({
      value: company.id,
      label: company.companyName,
    })) ?? [];

  const roleOptions = roles
    .filter((role) => role.isActive !== false)
    .map((role) => ({
      value: role.id,
      label: role.roleName,
    }));

  const fieldError = (message?: string) =>
    message ? <p className="mt-1 text-xs text-red-500">{message}</p> : null;

  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <section
      aria-labelledby="create-employee-title"
      className="mt-4 overflow-hidden rounded-[17px] border border-[#e0e3e9] bg-white"
    >
      <div className=" border-b border-[#e9ebef] px-5 py-4.5 sm:flex-row sm:items-center sm:justify-between">
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
                {isSystemMode
                  ? "Kompaniyaga xodim qo‘shish"
                  : "Yangi xodim qo‘shish"}
              </h2>
              <span className="rounded-full border border-[#dce0ee] bg-[#f5f6fb] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#58669d]">
                {isSystemMode ? "Super Admin" : "HR"}
              </span>
            </div>
            <p className="mt-1 text-[13px] text-[#748093]">
              Xodim akkaunti, lavozimi va boshlang‘ich ruxsatlarini belgilang
            </p>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_330px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 xl:border-r xl:border-[#e9ebef]"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {/* Kompaniya tanlash (Controller orqali) */}
            {isSystemMode && (
              <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Kompaniya *
              </span>
              <Controller
                name="companyId"
                control={control}
                rules={{ required: "Kompaniyani tanlang" }}
                render={({ field }) => (
                  <>
                    <AppSelect
                      id="companyId"
                      ref={field.ref}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(companyId) => {
                        field.onChange(companyId);
                        setValue("roleId", "");
                      }}
                      options={companyOptions}
                      placeholder="Kompaniyani tanlang"
                      hasError={Boolean(errors.companyId)}
                    />
                    {fieldError(errors.companyId?.message)}
                  </>
                )}
              />
              </label>
            )}

            {/* Lavozim */}
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Lavozim *
              </span>
              <Controller
                name="roleId"
                control={control}
                rules={{ required: "Lavozimni tanlang" }}
                render={({ field, fieldState }) => (
                  <>
                    <AppSelect
                      id="roleId"
                      ref={field.ref}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      options={roleOptions}
                      disabled={areRolesLoading || areRolesError}
                      placeholder={
                        areRolesLoading
                          ? "Lavozimlar yuklanmoqda..."
                          : areRolesError
                            ? "Lavozimlarni yuklab bo‘lmadi"
                            : "Lavozimni tanlang"
                      }
                      hasError={Boolean(fieldState.error)}
                    />
                    {areRolesError && (
                      <button
                        type="button"
                        onClick={() => refetchRoles()}
                        className="mt-1.5 text-xs font-medium text-[#c05225] underline underline-offset-2"
                      >
                        Qayta yuklash
                      </button>
                    )}
                    {fieldError(fieldState.error?.message)}
                  </>
                )}
              />
            </label>

            {/* Ism */}
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Ism *
              </span>
              <input
                {...register("name", { required: "Ismni kiriting" })}
                type="text"
                placeholder="Xodim ismi"
                className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
              />
              {fieldError(errors.name?.message)}
            </label>

            {/* Familiya / Sharif */}
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Familiya / Sharif *
              </span>
              <input
                {...register("middleName", {
                  required: "Familiya yoki sharifni kiriting",
                })}
                type="text"
                placeholder="Xodim familiyasi yoki sharifi"
                className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
              />
              {fieldError(errors.middleName?.message)}
            </label>

            {/* Telefon */}
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Telefon raqam *
              </span>
              <span className="relative block">
                <Phone
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8b95a4]"
                />
                <input
                  {...register("phone", {
                    required: "Telefon raqamni kiriting",
                    pattern: {
                      value: /^\+998 \d{2} \d{3} \d{2} \d{2}$/,
                      message: "Raqamni to'liq kiriting (+998 90 123 45 67)",
                    },
                  })}
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  onFocus={(e) => {
                    if (!e.target.value) {
                      setValue("phone", "+998 ");
                    }
                  }}
                  onChange={(e) => {
                    const formatted = formatUzPhone(e.target.value);
                    setValue("phone", formatted, { shouldValidate: true });
                  }}
                  className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] pl-10 pr-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                />
              </span>
              {fieldError(errors.phone?.message)}
            </label>

            {/* Tug'ilgan sana */}
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Tug‘ilgan sana *
              </span>
              <span className="relative block">
                <Calendar
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8b95a4]"
                />
                <input
                  {...register("date", {
                    required: "Tug‘ilgan sanani kiriting",
                  })}
                  type="date"
                  className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] pl-10 pr-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                />
              </span>
              {fieldError(errors.date?.message)}
            </label>

            {/* Login */}
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Login *
              </span>
              <input
                {...register("login", {
                  required: "Login kiriting",
                  validate: (value) =>
                    value.trim().length >= 3 ||
                    "Login kamida 3 ta belgidan iborat bo‘lsin",
                })}
                type="text"
                autoComplete="off"
                placeholder="Masalan: sardor.i"
                className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
              />
              {fieldError(errors.login?.message)}
            </label>

            {/* Vaqtinchalik parol */}
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]">
                Vaqtinchalik parol *
              </span>
              <span className="relative block">
                <KeyRound
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8b95a4]"
                />
                <button
                  type="button"
                  onClick={handleToggle}
                  aria-label={open ? "Parolni yashirish" : "Parolni ko‘rsatish"}
                  className="flex absolute right-3 top-2 size-8 items-center justify-center rounded-lg text-[#8b95a4] transition-colors  cursor-pointer"
                >
                  {open ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
                <input
                  {...register("password", {
                    required: "Parol kiriting",
                    minLength: {
                      value: 6,
                      message: "Parol kamida 6 ta belgidan iborat bo'lsin",
                    },
                  })}
                  type={open ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Kamida 6 ta belgi"
                  className="h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] pl-10 pr-3 text-[13px] text-[#303742] outline-none transition placeholder:text-[#9ba3af] focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10"
                />
              </span>
              {fieldError(errors.password?.message)}
            </label>
          </div>

          {/* Tugmalar */}
          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-[#eceef2] pt-4 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => reset()}
              disabled={isPending}
              className="h-10 cursor-pointer rounded-[10px] border border-[#dce0e6] bg-white px-4 text-[13px] font-medium text-[#596477] transition hover:bg-[#f6f7f9]"
            >
              Tozalash
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#171a1f] px-5 text-[13px] font-semibold text-white transition hover:bg-[#282d35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171a1f] disabled:opacity-50"
            >
              <UserPlus aria-hidden="true" className="size-4" />
              {isPending ? "Qo‘shilmoqda..." : "Xodim qo‘shish"}
            </button>
          </div>
        </form>

        <CreateRoleForEmployers />
      </div>
    </section>
  );
};

export default CreateFormEmployee;
