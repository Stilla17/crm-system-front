import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveBranchPlan } from "src/service/moysklad.service";
import type {
  MoyskladBranch,
  MoyskladSalesType,
} from "src/types/moysklad.type";

export const useSaveBranchPlan = (
  from: string,
  to: string,
  type: MoyskladSalesType,
  companyId?: string,
) => {
  const queryClient = useQueryClient();
  const queryKey = [
    "moysklad",
    "branches",
    from,
    to,
    type,
    companyId,
  ] as const;

  return useMutation({
    mutationKey: ["moysklad", "branch-plan"],
    mutationFn: saveBranchPlan,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });

      const previousPlan = queryClient
        .getQueryData<MoyskladBranch[]>(queryKey)
        ?.find((branch) => branch.id === variables.retailStoreId)?.monthlyPlan;

      queryClient.setQueryData<MoyskladBranch[]>(queryKey, (branches) =>
        branches?.map((branch) =>
          branch.id === variables.retailStoreId
            ? {
                ...branch,
                monthlyPlan: variables.amount,
              }
            : branch,
        ),
      );

      return { previousPlan };
    },
    onError: (_error, variables, context) => {
      const previousPlan = context?.previousPlan;

      if (previousPlan === undefined) return;

      queryClient.setQueryData<MoyskladBranch[]>(queryKey, (branches) =>
        branches?.map((branch) =>
          branch.id === variables.retailStoreId
            ? { ...branch, monthlyPlan: previousPlan }
            : branch,
        ),
      );
    },
  });
};
