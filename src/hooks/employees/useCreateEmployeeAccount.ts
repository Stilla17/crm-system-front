import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEmployee,
  getCompanyEmployee,
  importEmployeesFromVerifix,
} from "src/service/employee.service";
import { createCompanyUser, createUser } from "src/service/user.service";
import type {
  CreateEmployeeAccountPayload,
  EmployeeRecord,
} from "src/types/employee.type";

type CreateEmployeeAccountInput = {
  employee: EmployeeRecord;
  data: CreateEmployeeAccountPayload;
  companyId?: string;
};

const toUserDate = (value?: string) => {
  if (!value) return "";

  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : value;
};

export const useCreateEmployeeAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ employee, data, companyId }: CreateEmployeeAccountInput) => {
      const userPayload = {
        ...data,
        name: employee.firstName,
        middleName: employee.lastName,
        phone: employee.phone || "",
        date: toUserDate(employee.birthDate),
      };
      const user = companyId
        ? await createCompanyUser(companyId, userPayload)
        : await createUser(userPayload);

      if (companyId) {
        await importEmployeesFromVerifix(companyId);
        const linkedEmployee = await getCompanyEmployee(companyId, employee.id);

        if (linkedEmployee.userId !== user.id) {
          throw new Error(
            "CRM akkaunti yaratildi, lekin xodimga avtomatik bog‘lanmadi. Verifixdan qayta import qiling.",
          );
        }

        return linkedEmployee;
      }

      return createEmployee({
        userId: user.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        middleName: employee.middleName,
        gender: employee.gender,
        phone: employee.phone,
        birthDate: employee.birthDate,
        jobId: employee.jobId,
        divisionId: employee.divisionId,
        locationIds: employee.locationIds,
      });
    },
    onSuccess: (employee) => {
      queryClient.setQueryData(
        ["employees", employee.companyId, employee.id],
        employee,
      );
      void queryClient.invalidateQueries({ queryKey: ["employees"] });
      void queryClient.invalidateQueries({ queryKey: ["users"] });
      void queryClient.invalidateQueries({ queryKey: ["system-users"] });
    },
  });
};
