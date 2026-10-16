import { useQuery } from "@tanstack/react-query";
import { getAuthProfile } from "src/service/auth.service";

export const useAuthProfile = () => {
  return useQuery({
    queryKey: ["auth-profile"],
    queryFn: getAuthProfile,
    staleTime: 5 * 60 * 1000,
  });
};
