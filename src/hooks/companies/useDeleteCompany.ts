import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompany } from "src/service/company.service";

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCompany(id),
    onSuccess: () => {
      // Ro'yxatni qayta yangilab, o'chirilgan elementni ekrandan olib tashlaydi
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};
