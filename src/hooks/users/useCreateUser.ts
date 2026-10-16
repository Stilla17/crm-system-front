import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "src/service/user.service";
import type { CreateEmployeePayload } from "src/types/employee.type";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmployeePayload) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
