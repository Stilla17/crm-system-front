import type { User } from "src/types/auth.type";
import type { Role } from "src/types/role.type";

export const getUserRoleName = (
  userId: string,
  users: User[],
  roles: Role[],
): string => {
  const user = users.find((item) => item.id === userId);

  if (!user) return "Rol biriktirilmagan";

  if (user.roleName) return user.roleName;

  return (
    roles.find((role) => role.id === user.roleId)?.roleName ??
    "Rol biriktirilmagan"
  );
};
