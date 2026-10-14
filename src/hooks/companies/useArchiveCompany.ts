import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archiveCompany } from "src/service/company.service";
import type { Company } from "src/types/company";

export const useArchiveCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archiveCompany,
    onSuccess: (_, companyId) => {
      queryClient.setQueryData<Company[]>(["companies"], (companies) =>
        companies?.map((company) =>
          company.id === companyId
            ? { ...company, status: "archived" }
            : company,
        ),
      );

    },
  });
};
