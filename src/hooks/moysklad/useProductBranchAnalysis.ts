import { useQuery } from "@tanstack/react-query";
import { getProductBranchAnalysis } from "src/service/moysklad.service";

export const useProductBranchAnalysis = (
  branchId: string,
  productId: string,
  enabled: boolean,
) =>
  useQuery({
    queryKey: ["moysklad", "product-branch-analysis", branchId, productId],
    queryFn: () => getProductBranchAnalysis({ branchId, productId }),
    enabled: enabled && Boolean(branchId && productId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
