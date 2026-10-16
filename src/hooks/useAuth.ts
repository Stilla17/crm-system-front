import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login, logout } from "src/service/auth.service";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth-profile"] });
      toast.success("Tizimga muvaffaqiyatli kirdingiz");
      router.replace("/");
      router.refresh();
    },
    onError: (error) => {
      if (!isAxiosError(error) || !error.response) {
        toast.error("Server bilan bog‘lanib bo‘lmadi");
        return;
      }

      if (error.response.status >= 500) {
        toast.error("DB hali ishga tushmagan");
        return;
      }

      if (error.response.status === 401) {
        toast.error("Login yoki parol noto‘g‘ri");
        return;
      }

      toast.error("Tizimga kirishda xatolik yuz berdi");
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      toast.success("Tizimdan chiqdingiz");
      router.replace("/auth/companies");
      router.refresh();
    },
    onError: () => {
      toast.error("Tizimdan chiqishda xatolik yuz berdi");
    },
  });
};
