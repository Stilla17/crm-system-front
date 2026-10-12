export type CompanyOverviewContent = {
  title: string;
  description: string;
};

export type CompanyType = (typeof COMPANY_TYPES)[number]["value"];
export type Company = {
  id: string;
  companyName: string;
  slug: string;
  type: CompanyType;
};

export const COMPANY_TYPES = [
  { value: "bookstore", label: "Kitob do‘koni" },
  { value: "publisher", label: "Nashriyot" },
] as const;

export type CompanyFormValues = {
  companyName: string;
  type: CompanyType;
};
