import { useQuery } from "@tanstack/react-query";
import { getMoyskladBranches } from "src/service/moysklad.service";

export const useMoyskladBranches = (from: string, to: string) => {
  return useQuery({
    queryKey: ["moysklad", "branches", from, to],
    queryFn: () => getMoyskladBranches(from, to),
    enabled: Boolean(from && to),

    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,

    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    placeholderData: (previousData) => previousData,
  });
};
