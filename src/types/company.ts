export type CompanyOverviewContent = {
  title: string;
  description: string;
};

export type CompanyType = (typeof COMPANY_TYPES)[number]["value"];
export type Company = {
  id: string;
  companyName: string;
  brandColor: string;
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
  brandColor: string;
};

export interface Props {
  company: Company;
  open: boolean;
  onClose: () => void;
}

export type CompanyFormProps = {
  defaultValues?: CompanyFormValues;
  isSubmitting?: boolean;
  submitLabel: string;
  onSubmit: (values: CompanyFormValues) => void;
};

export type CompanyOption = {
  id: string;
  label: string;
  brandColor?: string;
};

export type CompanyFilterProps = {
  companies: CompanyOption[];
  value: string;
  onChange: (companyId: string) => void;
  onEdit: (companyId: string) => void;
};
