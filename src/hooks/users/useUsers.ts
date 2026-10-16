import { useQuery } from "@tanstack/react-query";
import { getSystemUsers, getUsers } from "src/service/user.service";

export const useSystemUsers = () => {
  return useQuery({
    queryKey: ["system-users"],
    queryFn: getSystemUsers,
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
