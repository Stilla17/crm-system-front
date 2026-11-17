"use client";

import { Eye, EyeOff, KeyRound } from "lucide-react";
import type { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DateField } from "src/components/dashboard-toolbar/date-field";
import { AppSelect, type SelectOption } from "src/components/others/app-select";
import { formatUzPhone } from "src/lib/formatter-phone";
import type { EmployeeGender } from "src/types/employee.type";

export type EditEmployeeFormValues = {
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

type EmployeeEditFormFieldsProps = {
  hasUser: boolean;
  canChangeCompany: boolean;
  roleOptions: SelectOption[];
  companyOptions: SelectOption[];
  areRolesLoading: boolean;
  areCompaniesLoading: boolean;
  showPassword: boolean;
  onTogglePassword: () => void;
};

type FormFieldProps = {
  id?: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

const INPUT_CLASS =
  "h-11 w-full rounded-[11px] border border-[#dde1e7] bg-[#f9fafb] px-3 text-[13px] text-[#303742] outline-none focus:border-[#e8622a] focus:bg-white focus:ring-4 focus:ring-[#e8622a]/10";

const GENDER_OPTIONS: SelectOption<EmployeeGender>[] = [
  { value: "M", label: "Erkak" },
  { value: "F", label: "Ayol" },
];

const NAME_FIELDS: Array<{
  name: "firstName" | "lastName" | "middleName";
  label: string;
  requiredMessage?: string;
}> = [
  { name: "firstName", label: "Ism", requiredMessage: "Ismni kiriting" },
  { name: "lastName", label: "Familiya", requiredMessage: "Familiyani kiriting" },
  { name: "middleName", label: "Sharif" },
];

function FormField({ id, label, required, error, hint, children }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#626d7e]"
      >
        {label}
        {required && " *"}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {hint && <p className="mt-1 text-[11px] text-[#8a94a2]">{hint}</p>}
    </div>
  );
}

export function EmployeeEditFormFields({
  hasUser,
  canChangeCompany,
  roleOptions,
  companyOptions,
  areRolesLoading,
  areCompaniesLoading,
  showPassword,
  onTogglePassword,
}: EmployeeEditFormFieldsProps) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<EditEmployeeFormValues>();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {NAME_FIELDS.map(({ name, label, ...field }) => (
        <FormField
          key={name}
          id={name}
          label={label}
          required={Boolean(field.requiredMessage)}
          error={errors[name]?.message}
        >
          <input
            id={name}
            {...register(name, { required: field.requiredMessage })}
            className={INPUT_CLASS}
          />
        </FormField>
      ))}

      <FormField id="gender" label="Jinsi" required>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <AppSelect<EmployeeGender> id="gender" {...field} options={GENDER_OPTIONS} />
          )}
        />
      </FormField>

      <Controller
        name="roleId"
        control={control}
        rules={{ required: "Rolni tanlang" }}
        render={({ field, fieldState }) => (
          <FormField
            id="roleId"
            label="Rol"
            required
            error={fieldState.error?.message}
            hint={hasUser ? undefined : "Tanlangan rol yangi CRM akkauntiga biriktiriladi."}
          >
            <AppSelect
              id="roleId"
              {...field}
              options={roleOptions}
              placeholder={areRolesLoading ? "Rollar yuklanmoqda..." : "Rolni tanlang"}
              disabled={areRolesLoading}
              hasError={Boolean(fieldState.error)}
            />
          </FormField>
        )}
      />

      {!hasUser && (
        <>
          <FormField id="login" label="CRM login" required error={errors.login?.message}>
            <input
              id="login"
              {...register("login", {
                required: "Loginni kiriting",
                validate: (value) =>
                  value.trim().length >= 3 || "Login kamida 3 ta belgidan iborat bo‘lsin",
              })}
              autoComplete="off"
              placeholder="Masalan: sardor.i"
              className={INPUT_CLASS}
            />
          </FormField>

          <FormField
            id="password"
            label="Vaqtinchalik parol"
            required
            error={errors.password?.message}
          >
            <div className="relative">
              <KeyRound
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8b95a4]"
              />
              <input
                id="password"
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
                className={`${INPUT_CLASS} pl-10 pr-11`}
              />
              <button
                type="button"
                onClick={onTogglePassword}
                aria-label={showPassword ? "Parolni yashirish" : "Parolni ko‘rsatish"}
                className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-[#8b95a4]"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </FormField>
        </>
      )}

      {canChangeCompany && (
        <Controller
          name="companyId"
          control={control}
          rules={{ required: "Kompaniyani tanlang" }}
          render={({ field, fieldState }) => (
            <FormField
              id="companyId"
              label="Kompaniya"
              required
              error={fieldState.error?.message}
            >
              <AppSelect
                id="companyId"
                {...field}
                options={companyOptions}
                placeholder={
                  areCompaniesLoading
                    ? "Kompaniyalar yuklanmoqda..."
                    : "Kompaniyani tanlang"
                }
                disabled={areCompaniesLoading}
                hasError={Boolean(fieldState.error)}
              />
            </FormField>
          )}
        />
      )}

      <FormField
        id="phone"
        label="Telefon"
        required={!hasUser}
        error={errors.phone?.message}
      >
        <input
          id="phone"
          {...register("phone", {
            required: !hasUser ? "CRM akkaunti uchun telefonni kiriting" : false,
            validate: (value) =>
              !value ||
              /^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(value) ||
              "Raqamni to‘liq kiriting",
          })}
          onChange={(event) =>
            setValue("phone", formatUzPhone(event.target.value), { shouldValidate: true })
          }
          placeholder="+998 90 123 45 67"
          className={INPUT_CLASS}
        />
      </FormField>

      <Controller
        name="birthDate"
        control={control}
        rules={{
          required: !hasUser ? "CRM akkaunti uchun tug‘ilgan sanani kiriting" : false,
        }}
        render={({ field, fieldState }) => (
          <FormField
            label="Tug‘ilgan sana"
            required={!hasUser}
            error={fieldState.error?.message}
          >
            <DateField
              ariaLabel="Tug‘ilgan sanani tanlang"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              hasError={Boolean(fieldState.error)}
              className="w-full"
            />
          </FormField>
        )}
      />
    </div>
  );
}
