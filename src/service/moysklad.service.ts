import { api } from "src/lib/api";
import { MoyskladBranch, SalesSummaryResponse } from "src/types/moysklad.type";

type SalesSummaryParams = {
  from: string;
  to: string;
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
): Promise<MoyskladBranch[]> => {
  const response = await api.get<MoyskladBranch[]>("/sales/branch-summary", {
    params: {
      from,
      to,
    },
  });
  return response.data;
};
