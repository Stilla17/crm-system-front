import { useQuery } from "@tanstack/react-query";
import { getMoyskladBranches } from "src/service/moysklad.service";
import { MoyskladSalesType } from "src/types/moysklad.type";

export const useMoyskladBranches = (
  from: string,
  to: string,
  type: MoyskladSalesType,
) => {
  return useQuery({
    queryKey: ["moysklad", "branches", from, to, type],
    queryFn: () => getMoyskladBranches(from, to, type),
    enabled: Boolean(from && to),

    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,

    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    placeholderData: (previousData) => previousData,
  });
};
