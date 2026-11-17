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
  monthlyPlan: number;
  result: number;
};
