import { api } from "src/lib/api";
import { Company, CompanyFormValues } from "src/types/company";

export const createCompany = async (
  data: CompanyFormValues,
): Promise<Company> => {
  const response = await api.post("/companies", data);

  return response.data;
};

export const getAllCompanies = async (): Promise<Company[]> => {
  const response = await api.get<Company[]>("/companies");

  return response.data;
};

export const deleteCompany = async (id: string) => {
  const response = await api.delete(`/companies/${id}`);
  return response.data;
};

export const updateCompany = async (
  id: string,
  data: Partial<CompanyFormValues>,
): Promise<Company> => {
  const response = await api.patch(`/companies/${id}`, data);
  return response.data;
};
// arxivega solish
export const archiveCompany = async (id: string) => {
  const { data } = await api.patch(`/companies/${id}/archive`);
  return data;
};
// arxivedan chiqarish
export const restoreCompany = async (id: string) => {
  const { data } = await api.patch(`/companies/${id}/restore`);
  return data;
};
