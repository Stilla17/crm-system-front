import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "src/service/employee.service";
import { createUser } from "src/service/user.service";
import {
  CreateEmployeeRecordPayload,
  CreateUserPayload,
} from "src/types/employee.type";

type CreateEmployeeWithUserInput = {
  user: CreateUserPayload;
  employee: Omit<CreateEmployeeRecordPayload, "userId">;
};

export const useCreateEmployeeWithUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      user: userPayload,
      employee: employeePayload,
    }: CreateEmployeeWithUserInput) => {
      // 1. CRM login akkaunti yaratiladi
      const user = await createUser(userPayload);

      // 2. User ID orqali Employee yaratiladi
      // Backend uni avtomatik Verifix’ga yuboradi
      const employee = await createEmployee({
        ...employeePayload,
        userId: user.id,
      });

      return { user, employee };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
};
