import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreCompany } from "src/service/company.service";
import type { Company } from "src/types/company";

export const useRestoreCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreCompany,
    onSuccess: (_, companyId) => {
      queryClient.setQueryData<Company[]>(["companies"], (companies) =>
        companies?.map((company) =>
          company.id === companyId ? { ...company, status: "active" } : company,
        ),
      );
    },
  });
};
