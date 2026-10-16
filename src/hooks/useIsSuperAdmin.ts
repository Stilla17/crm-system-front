import { useAuthProfile } from "src/hooks/users/useAuthProfile";

export const useIsSuperAdmin = () => {
  const { data: profile } = useAuthProfile();

  return profile?.roleScope === "system" && profile.companyId === null;
};
