import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "src/service/auth.service";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });
};
