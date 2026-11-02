import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "src/service/user.service";
import type { CreateUserPayload } from "src/types/employee.type";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserPayload) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
