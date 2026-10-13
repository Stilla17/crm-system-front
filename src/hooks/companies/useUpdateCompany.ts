import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompany } from "src/service/company.service";
import type { Company, CompanyFormValues } from "src/types/company";

interface UpdateTypeCompany {
  id: string;
  data: Partial<CompanyFormValues>;
}

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation<Company, Error, UpdateTypeCompany>({
    mutationFn: ({ id, data }) => updateCompany(id, data),
    onSuccess: (updatedCompany) => {
      // 1. Kompaniyalar ro'yxatini yangilash
      queryClient.invalidateQueries({ queryKey: ["companies"] });

      // 2. Agar bitta kompaniyani ko'rish sahifasi ochiq bo'lsa, uning keshini ham yangilash
      queryClient.invalidateQueries({
        queryKey: ["company", updatedCompany.id],
      });
    },
  });
};
