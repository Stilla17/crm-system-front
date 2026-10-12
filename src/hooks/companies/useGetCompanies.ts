import { useQuery } from "@tanstack/react-query";
import { getAllCompanies } from "src/service/company.service";
import { Company } from "src/types/company";

export const useGetCompanies = () => {
  return useQuery<Company[]>({
    queryKey: ["companies"],
    queryFn: () => getAllCompanies(),
  });
};
