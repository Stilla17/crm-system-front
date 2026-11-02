"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useGetPublicCompanies } from "./useGetCompanies";
import { useAuthProfile } from "../users/useAuthProfile";

export const useCurrentCompany = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const companyIdFromQuery = searchParams.get("companyId");

  const { data: companies = [] } = useGetPublicCompanies();

  const { data: profile } = useAuthProfile({
    enabled: !pathname.startsWith("/auth"),
  });

  const companyId = companyIdFromQuery ?? profile?.companyId ?? null;

  const company = companies.find((item) => item.id === companyId);

  return {
    companyId,
    company,
    companyName: company?.companyName ?? null,
  };
};
