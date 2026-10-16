import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { replaceCompanyAdmin } from "src/service/company.service";

export const useReplaceCompanyAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: replaceCompanyAdmin,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });

      queryClient.invalidateQueries({
        queryKey: ["company", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["system-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
    onError: (error) => {
      const responseData = isAxiosError(error)
        ? (error.response?.data as { message?: string | string[] } | undefined)
        : undefined;

      console.error(
        "Adminni almashtirishda xatolik:",
        responseData?.message ?? responseData ?? error,
      );
    },
  });
};
