import { useQuery } from "@tanstack/react-query";
import { getSalesSummary } from "src/service/moysklad.service";

export const useSalesSummary = (from: string, to: string) => {
  return useQuery({
    queryKey: ["sales", "summary", from, to],
    queryFn: () => getSalesSummary({ from, to }),
    enabled: Boolean(from && to),
  });
};
