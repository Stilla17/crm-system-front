import { useQuery } from "@tanstack/react-query";
import { getAuthProfile } from "src/service/auth.service";

type UseAuthProfileOptions = {
  enabled?: boolean;
};

export const useAuthProfile = ({
  enabled = true,
}: UseAuthProfileOptions = {}) => {
  return useQuery({
    queryKey: ["auth-profile"],
    queryFn: getAuthProfile,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};
