"use client";

import { isAxiosError } from "axios";
import { Save, X } from "lucide-react";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useGetCompanies } from "src/hooks/companies/useGetCompanies";
import { useCreateEmployeeAccount } from "src/hooks/employees/useCreateEmployeeAccount";
import { useUpdateEmployee } from "src/hooks/employees/useUpdateEmployee";
import { useGetRoles } from "src/hooks/roles/useGetRoles";
import { formatUzPhone } from "src/lib/formatter-phone";
import type {
  EmployeeRecord,
  UpdateEmployeePayload,
} from "src/types/employee.type";
import {
  EmployeeEditFormFields,
  type EditEmployeeFormValues,
} from "./employee-edit-form-fields";

type EmployeeEditFormProps = {
  employee: EmployeeRecord;
  companyId?: string;
  onCancel: () => void;
  canChangeCompany?: boolean;
  onSaved: (employee: EmployeeRecord) => void;
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

const getDefaultValues = (
  employee: EmployeeRecord,
): EditEmployeeFormValues => ({
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
});

const getUpdatePayload = (
  values: EditEmployeeFormValues,
  hasUser: boolean,
): UpdateEmployeePayload => ({
  firstName: values.firstName.trim(),
  lastName: values.lastName.trim(),
  middleName: values.middleName.trim(),
  gender: values.gender,
  ...(values.phone && { phone: `+${values.phone.replace(/\D/g, "")}` }),
  ...(values.birthDate && { birthDate: toVerifixDate(values.birthDate) }),
  ...(hasUser && values.roleId && { roleId: values.roleId }),
});

const getEditErrorMessage = (error: unknown) => {
  if (error instanceof Error && !isAxiosError(error)) return error.message;
  if (!isAxiosError(error)) return "Xodimni tahrirlashda xatolik yuz berdi";

  const message = (
    error.response?.data as { message?: string | string[] } | undefined
  )?.message;
  return Array.isArray(message)
    ? message[0]
    : message || "Xodimni tahrirlashda xatolik yuz berdi";
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
  const form = useForm<EditEmployeeFormValues>({
    defaultValues: getDefaultValues(employee),
  });

  const roleOptions = useMemo(
    () =>
      roles
        .filter((role) => role.isActive !== false)
        .map((role) => ({ value: role.id, label: role.roleName })),
    [roles],
  );
  const companyOptions = useMemo(
    () =>
      companies.map((company) => ({
        value: company.id,
        label: company.companyName,
      })),
    [companies],
  );

  const submit = (values: EditEmployeeFormValues) => {
    const saveResult = (savedEmployee: EmployeeRecord, message: string) => {
      toast.success(message);
      onSaved(savedEmployee);
    };
    const handleError = (error: unknown) =>
      toast.error(getEditErrorMessage(error));

    updateEmployee.mutate(
      {
        employeeId: employee.id,
        data: getUpdatePayload(values, Boolean(employee.user)),
        ...(canChangeCompany &&
          values.companyId !== employee.companyId && {
            targetCompanyId: values.companyId,
          }),
      },
      {
        onError: handleError,
        onSuccess: (updatedEmployee) => {
          if (employee.user) {
            saveResult(updatedEmployee, "Xodim ma’lumotlari yangilandi");
            return;
          }

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
              onError: handleError,
              onSuccess: (employeeWithAccount) =>
                saveResult(
                  employeeWithAccount,
                  "Xodim ma’lumotlari va CRM akkaunti saqlandi",
                ),
            },
          );
        },
      },
    );
  };

  const isPending = updateEmployee.isPending || createAccount.isPending;

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

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <EmployeeEditFormFields
            hasUser={Boolean(employee.user)}
            canChangeCompany={canChangeCompany}
            roleOptions={roleOptions}
            companyOptions={companyOptions}
            areRolesLoading={areRolesLoading}
            areCompaniesLoading={areCompaniesLoading}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((visible) => !visible)}
          />

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
      </FormProvider>
    </section>
  );
}
