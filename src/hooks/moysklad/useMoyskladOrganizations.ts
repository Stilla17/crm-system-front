import { useQuery } from "@tanstack/react-query";
import { getMoyskladOrganizations } from "src/service/moysklad.service";

export const useMoyskladOrganizations = () => {
  return useQuery({
    queryKey: ["moysklad", "organizations"],
    queryFn: getMoyskladOrganizations,
    staleTime: 60 * 60 * 1000,
  });
};
