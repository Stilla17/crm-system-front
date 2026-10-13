import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login, logout } from "src/service/auth.service";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Tizimga muvaffaqiyatli kirdingiz");
      router.replace("/");
      router.refresh();
    },
    onError: () => {
      toast.error("Login yoki parol noto‘g‘ri");
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Tizimdan chiqdingiz");
    },
    onSettled: () => {
      queryClient.clear();
      router.replace("/auth");
      router.refresh();
    },
  });
};
