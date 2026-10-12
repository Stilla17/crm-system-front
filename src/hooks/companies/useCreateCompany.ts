import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompany } from "src/service/company.service";
import { CompanyFormValues } from "src/types/company";

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CompanyFormValues) => createCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};
