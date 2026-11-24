export type SalesSummaryResponse = {
  period: {
    from: string;
    to: string;
    timezone: string;
  };
  summary: {
    grossSales: number;
    returns: number;
    netSales: number;
    salesDocumentCount: number;
    returnDocumentCount: number;
  };
  breakdown: {
    wholesale: {
      sales: number;
      returns: number;
      netSales: number;
      salesDocumentCount: number;
      returnDocumentCount: number;
    };
    retail: {
      sales: number;
      returns: number;
      netSales: number;
      salesDocumentCount: number;
      returnDocumentCount: number;
    };
  };
  currency: {
    code: string;
    precision: number;
  };
  source: "moysklad";
};

export type MoyskladBranch = {
  id: string;
  name: string;
  entityType: "retailStore" | "organization";
  hasProductDetails: boolean;
  organization: MoyskladOrganization;
  monthlyPlan: number;
  result: number;
};

export type MoyskladOrganization = {
  id: string;
  name: string;
};

export type MoyskladSalesType = "all" | "shipment" | "retail";

export type BranchProductSort =
  | "stock_desc"
  | "stock_asc"
  | "name_asc"
  | "sales_desc"
  | "last_sold_asc";

export type BranchProductFilter = "all" | "stale" | "never_sold";

export type BranchProduct = {
  id: string;
  name: string;
  code?: string;
  article?: string;
  stock: number;
  available: number;
  inTransit: number;
  lastSoldAt: string | null;
  lastReceivedAt: string | null;
  soldQuantity30Days: number;
  soldQuantity90Days: number;
};

export type BranchProductsResponse = {
  branch: {
    id: string;
    name: string;
  };
  summary: {
    productCount: number;
    totalAvailable: number;
    noSales90DaysCount: number;
  };
  syncedAt: string | null;
  items: BranchProduct[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ProductBranchPerformance = {
  id: string;
  name: string;
  available: number;
  inTransit: number;
  soldQuantity30Days: number;
  soldQuantity90Days: number;
  dailyVelocity: number;
  syncedAt: string;
  rank: number;
  isCurrentBranch: boolean;
};

export type ProductBranchAnalysisResponse = {
  mode: "read_only";
  analyzedAt: string;
  product: {
    id: string;
    name: string;
    code?: string;
    article?: string;
  };
  currentBranch: ProductBranchPerformance;
  bestSellingBranch: ProductBranchPerformance | null;
  recommendation: {
    branch: ProductBranchPerformance;
    velocityRatio: number | null;
    reason: string;
  } | null;
  branchRanking: ProductBranchPerformance[];
  analyzedBranchCount: number;
  excludedBranches: {
    id: string;
    name: string;
    syncedAt: string | null;
    reason: string;
  }[];
};
