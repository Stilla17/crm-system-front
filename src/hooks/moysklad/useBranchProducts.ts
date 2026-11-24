import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getBranchProducts,
  type BranchProductsParams,
} from "src/service/moysklad.service";

export const useBranchProducts = (
  params: BranchProductsParams,
  enabled = true,
) =>
  useQuery({
    queryKey: ["moysklad", "branch-products", params],
    queryFn: () => getBranchProducts(params),
    enabled: enabled && Boolean(params.branchId),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
