import { useQuery } from "@tanstack/react-query";
import {
  getAllCompanies,
  getPublicCompanies,
} from "src/service/company.service";
import { Company } from "src/types/company";

export const useGetCompanies = (enabled = true) => {
  return useQuery<Company[]>({
    queryKey: ["companies"],
    queryFn: () => getAllCompanies(),
    enabled,
  });
};

export const useGetPublicCompanies = () => {
  return useQuery<Company[]>({
    queryKey: ["companies"],
    queryFn: () => getPublicCompanies(),
  });
};
