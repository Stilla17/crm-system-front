import { api } from "src/lib/api";
import {
  MoyskladBranch,
  MoyskladSalesType,
  SalesSummaryResponse,
} from "src/types/moysklad.type";

type SalesSummaryParams = {
  from: string;
  to: string;
};

export type SaveBranchPlanParams = {
  retailStoreId: string;
  month: string;
  amount: number;
};

export const getSalesSummary = async ({
  from,
  to,
}: SalesSummaryParams): Promise<SalesSummaryResponse> => {
  const response = await api.get<SalesSummaryResponse>("/sales/summary", {
    params: {
      from,
      to,
    },
  });

  return response.data;
};

export const getMoyskladBranches = async (
  from: string,
  to: string,
  type: MoyskladSalesType,
): Promise<MoyskladBranch[]> => {
  const response = await api.get<MoyskladBranch[]>("/sales/branch-summary", {
    params: {
      from,
      to,
      type,
    },
  });

  return response.data;
};

export const saveBranchPlan = async ({
  retailStoreId,
  month,
  amount,
}: SaveBranchPlanParams) => {
  const response = await api.put(`/sales/branch-plans/${retailStoreId}`, {
    month,
    amount,
  });

  return response.data;
};
