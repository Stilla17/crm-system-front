import { api } from "src/lib/api";
import {
  BranchProductFilter,
  BranchProductsResponse,
  BranchProductSort,
  MoyskladBranch,
  MoyskladOrganization,
  MoyskladSalesType,
  ProductBranchAnalysisResponse,
  SalesSummaryResponse,
} from "src/types/moysklad.type";

export type BranchProductsParams = {
  branchId: string;
  search?: string;
  sort?: BranchProductSort;
  filter?: BranchProductFilter;
  staleDays?: 30 | 60 | 90;
  page?: number;
  limit?: number;
};

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
  companyId?: string,
): Promise<MoyskladBranch[]> => {
  const response = await api.get<MoyskladBranch[]>("/sales/branch-summary", {
    params: {
      from,
      to,
      type,
      companyId,
    },
  });

  return response.data;
};

export const getMoyskladOrganizations = async (): Promise<
  MoyskladOrganization[]
> => {
  const response = await api.get<MoyskladOrganization[]>(
    "/moysklad/organizations",
  );

  return response.data;
};

export const getBranchProducts = async ({
  branchId,
  ...params
}: BranchProductsParams): Promise<BranchProductsResponse> => {
  const response = await api.get<BranchProductsResponse>(
    `/sales/branches/${branchId}/products`,
    { params },
  );

  console.log(response.data)

  return response.data;
};

export const getProductBranchAnalysis = async ({
  branchId,
  productId,
}: {
  branchId: string;
  productId: string;
}): Promise<ProductBranchAnalysisResponse> => {
  const response = await api.get<ProductBranchAnalysisResponse>(
    `/sales/branches/${encodeURIComponent(branchId)}/products/${encodeURIComponent(productId)}/analysis`,
  );

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
