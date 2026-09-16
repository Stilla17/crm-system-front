export type CompanyOverviewContent = {
  title: string;
  description: string;
};

export type CompanySummary = {
  id: string;
  name: string;
  description: string;
  color: string;
  sales: string | null;
  plan?: string;
  progress?: number;
};
