"use client";

import { isAxiosError } from "axios";
import { Eye, EyeOff, KeyRound, Save, X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateEmployeeAccount } from "src/hooks/employees/useCreateEmployeeAccount";
import { useUpdateEmployee } from "src/hooks/employees/useUpdateEmployee";
import { useGetRoles } from "src/hooks/roles/useGetRoles";
import { useGetCompanies } from "src/hooks/companies/useGetCompanies";
import { formatUzPhone } from "src/lib/formatter-phone";
import type {
  EmployeeGender,
  EmployeeRecord,
} from "src/types/employee.type";
import { DateField } from "../dashboard-toolbar/date-field";
import { AppSelect } from "../others/app-select";

type EditEmployeeForm = {
  firstName: string;
  lastName: string;
  middleName: string;
  gender: EmployeeGender;
  phone: string;
  birthDate: string;
  roleId: string;
  companyId: string;
  login: string;
  password: string;
};

const toInputDate = (value?: string | null) => {
  if (!value) return "";
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : value;
};

const toVerifixDate = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match ? `${match[3]}.${match[2]}.${match[1]}` : value;
};

const errorMessage = (error: unknown) => {
  if (error instanceof Error && !isAxiosError(error)) return error.message;
  if (!isAxiosError(error)) return "Xodimni tahrirlashda xatolik yuz berdi";

  const data = error.response?.data as
    | { message?: string | string[] }
    | undefined;
  const message = data?.message;
  return Array.isArray(message)
    ? message[0]
    : message || "Xodimni tahrirlashda xatolik yuz berdi";
};

type EmployeeEditFormProps = {
  employee: EmployeeRecord;
  companyId?: string;
  onCancel: () => void;
  canChangeCompany?: boolean;
  onSaved: (employee: EmployeeRecord) => void;
};

export function EmployeeEditForm({
  employee,
  companyId,
  canChangeCompany = false,
  onCancel,
  onSaved,
}: EmployeeEditFormProps) {
  const updateEmployee = useUpdateEmployee(companyId);
  const createAccount = useCreateEmployeeAccount();
  const [showPassword, setShowPassword] = useState(false);
  const { data: roles = [], isLoading: areRolesLoading } = useGetRoles();
  const { data: companies = [], isLoading: areCompaniesLoading } =
    useGetCompanies(canChangeCompany);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditEmployeeForm>({
    defaultValues: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      middleName: employee.middleName || "",
      gender: employee.gender,
      phone: formatUzPhone(employee.phone || ""),
      birthDate: toInputDate(employee.birthDate),
      roleId: employee.user?.roleId || "",
      companyId: employee.companyId,
      login: employee.user?.login || "",
      password: "",
    },
  });

  const submit = (values: EditEmployeeForm) => {
    updateEmployee.mutate(
      {
        employeeId: employee.id,
        data: {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          middleName: values.middleName.trim(),
          gender: values.gender,
          ...(values.phone
            ? { phone: `+${values.phone.replace(/\D/g, "")}` }
            : {}),
          ...(values.birthDate
            ? { birthDate: toVerifixDate(values.birthDate) }
            : {}),
          ...(employee.user && values.roleId
            ? { roleId: values.roleId }
            : {}),
        },
        ...(canChangeCompany && values.companyId !== employee.companyId
          ? { targetCompanyId: values.companyId }
          : {}),
      },
      {
        onSuccess: (updatedEmployee) => {
          if (!employee.user) {
            createAccount.mutate(
              {
                employee: updatedEmployee,
                companyId: canChangeCompany ? values.companyId : undefined,
                data: {
                  login: values.login.trim().toLowerCase(),
                  password: values.password,
                  roleId: values.roleId,
                },
              },
              {
                onSuccess: (employeeWithAccount) => {
                  toast.success(
                    "Xodim ma’lumotlari va CRM akkaunti saqlandi",
                  );
                  onSaved(employeeWithAccount);
                },
                onError: (error) => toast.error(errorMessage(error)),
              },
            );
            return;
          }
          toast.success("Xodim ma’lumotlari yangilandi");
          onSaved(updatedEmployee);
        },
        onError: (error) => toast.error(errorMessage(error)),
      },
    );
  };

  const isPending = updateEmployee.isPending || createAccount.isPending;

  const inputClass =
    "h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 text-[13px] text-[#303742] outline-none focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10";
  const labelClass =
    "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]";

  return (
    <section className="mt-4 rounded-[17px] border border-[#e0e3e9] bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-[#20252c]">
            Xodimni tahrirlash
          </h2>
          <p className="mt-0.5 text-[11px] text-[#8a94a2]">
            O‘zgarishlar CRM va Verifix’da yangilanadi
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="flex size-9 cursor-pointer items-center justify-center rounded-[9px] border border-[#dce1e7] text-[#6b7686]"
          aria-label="Tahrirlashni yopish"
        >
          <X className="size-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit(submit)}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <label>
            <span className={labelClass}>Ism *</span>
            <input
              {...register("firstName", { required: "Ismni kiriting" })}
              className={inputClass}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </label>

          <label>
            <span className={labelClass}>Familiya *</span>
            <input
              {...register("lastName", { required: "Familiyani kiriting" })}
              className={inputClass}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </label>

          <label>
            <span className={labelClass}>Sharif</span>
            <input {...register("middleName")} className={inputClass} />
          </label>

          <label>
            <span className={labelClass}>Jinsi *</span>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <AppSelect<EmployeeGender>
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  options={[
                    { value: "M", label: "Erkak" },
                    { value: "F", label: "Ayol" },
                  ]}
                />
              )}
            />
          </label>

          <label>
            <span className={labelClass}>Rol *</span>
            <Controller
              name="roleId"
              control={control}
              rules={{ required: "Rolni tanlang" }}
              render={({ field, fieldState }) => (
                <>
                  <AppSelect
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    options={roles
                      .filter((role) => role.isActive !== false)
                      .map((role) => ({
                        value: role.id,
                        label: role.roleName,
                      }))}
                    placeholder={
                      areRolesLoading
                        ? "Rollar yuklanmoqda..."
                        : "Rolni tanlang"
                    }
                    disabled={areRolesLoading}
                    hasError={Boolean(fieldState.error)}
                  />
                  {fieldState.error && (
                    <p className="mt-1 text-xs text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                  {!employee.user && (
                    <p className="mt-1 text-[11px] text-[#8a94a2]">
                      Tanlangan rol yangi CRM akkauntiga biriktiriladi.
                    </p>
                  )}
                </>
              )}
            />
          </label>

          {!employee.user && (
            <>
              <label>
                <span className={labelClass}>CRM login *</span>
                <input
                  {...register("login", {
                    required: "Loginni kiriting",
                    validate: (value) =>
                      value.trim().length >= 3 ||
                      "Login kamida 3 ta belgidan iborat bo‘lsin",
                  })}
                  type="text"
                  autoComplete="off"
                  placeholder="Masalan: sardor.i"
                  className={inputClass}
                />
                {errors.login && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.login.message}
                  </p>
                )}
              </label>

              <label>
                <span className={labelClass}>Vaqtinchalik parol *</span>
                <span className="relative block">
                  <KeyRound
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8b95a4]"
                  />
                  <input
                    {...register("password", {
                      required: "Parolni kiriting",
                      minLength: {
                        value: 6,
                        message: "Parol kamida 6 ta belgidan iborat bo‘lsin",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Kamida 6 ta belgi"
                    className={`${inputClass} pl-10 pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={
                      showPassword ? "Parolni yashirish" : "Parolni ko‘rsatish"
                    }
                    className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-[#8b95a4]"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </span>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </label>
            </>
          )}

          {canChangeCompany && (
            <label>
              <span className={labelClass}>Kompaniya *</span>
              <Controller
                name="companyId"
                control={control}
                rules={{ required: "Kompaniyani tanlang" }}
                render={({ field, fieldState }) => (
                  <>
                    <AppSelect
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      options={companies.map((company) => ({
                        value: company.id,
                        label: company.companyName,
                      }))}
                      placeholder={
                        areCompaniesLoading
                          ? "Kompaniyalar yuklanmoqda..."
                          : "Kompaniyani tanlang"
                      }
                      disabled={areCompaniesLoading}
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
            </label>
          )}

          <label>
            <span className={labelClass}>Telefon</span>
            <input
              {...register("phone", {
                required: !employee.user
                  ? "CRM akkaunti uchun telefonni kiriting"
                  : false,
                validate: (value) =>
                  !value ||
                  /^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(value) ||
                  "Raqamni to‘liq kiriting",
              })}
              onChange={(event) =>
                setValue("phone", formatUzPhone(event.target.value), {
                  shouldValidate: true,
                })
              }
              placeholder="+998 90 123 45 67"
              className={inputClass}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </label>

          <div>
            <span className={labelClass}>Tug‘ilgan sana</span>
            <Controller
              name="birthDate"
              control={control}
              rules={{
                required: !employee.user
                  ? "CRM akkaunti uchun tug‘ilgan sanani kiriting"
                  : false,
              }}
              render={({ field, fieldState }) => (
                <DateField
                  ariaLabel="Tug‘ilgan sanani tanlang"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  hasError={Boolean(fieldState.error)}
                  className="w-full"
                />
              )}
            />
            {errors.birthDate && (
              <p className="mt-1 text-xs text-red-500">
                {errors.birthDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2 border-t border-[#eceef2] pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="h-10 cursor-pointer rounded-[10px] border border-[#dce0e6] bg-white px-4 text-[13px] font-medium text-[#596477]"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-[10px] bg-[#e8622a] px-5 text-[13px] font-semibold text-white disabled:opacity-60"
          >
            <Save className="size-4" />
            {isPending ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </div>
      </form>
    </section>
  );
}
